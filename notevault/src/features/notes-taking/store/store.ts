import { create } from 'zustand';
import { Folder, Note } from '../types';
import { hashPassword, verifyPassword } from './security';

interface StoreState {
  notes: Note[];
  folders: Folder[];
  labels: Array<{ id: string; name: string; color: string }>;
  selectedLabels: string[];
  noteVersions: Array<{
    id: string;
    noteId: string;
    content: string;
    title: string;
    createdAt: string;
    version: number;
  }>;
  searchQuery: string;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedLabels: (labelIds: string[]) => void;
  addLabel: (name: string, color: string) => void;
  deleteLabel: (id: string) => void;
  addLabelToNote: (noteId: string, labelId: string) => void;
  removeLabelFromNote: (noteId: string, labelId: string) => void;
  canAccessNote: (id: string, password?: string) => boolean;
  canAccessFolder: (id: string, password?: string) => boolean;
  updateNote: (id: string, data: Partial<Note>, password?: string) => void;
  addNote: (note: Partial<Note>) => void;
  deleteNote: (id: string, password?: string) => void;
  moveNote: (id: string, newFolderId: string, password?: string) => void;
  toggleFavorite: (id: string) => void;
  addFolder: (name: string, parentId: string | null, password?: string) => void;
  updateFolder: (id: string, name: string, password?: string) => void;
  deleteFolder: (id: string, password?: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  notes: [],
  folders: [],
  labels: [],
  selectedLabels: [],
  noteVersions: [],
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedLabels: (labelIds) => set({ selectedLabels: labelIds }),
  
  addLabel: (name, color) => set((state) => ({
    labels: [...state.labels, {
      id: crypto.randomUUID(),
      name,
      color
    }]
  })),
  
  deleteLabel: (id) => set((state) => ({
    labels: state.labels.filter((label) => label.id !== id),
    notes: state.notes.map((note) => ({
      ...note,
      labels: note.labels.filter((labelId) => labelId !== id)
    }))
  })),
  
  addLabelToNote: (noteId, labelId) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === noteId
        ? { ...note, labels: [...note.labels, labelId] }
        : note
    )
  })),
  
  removeLabelFromNote: (noteId, labelId) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === noteId
        ? { ...note, labels: note.labels.filter((id) => id !== labelId) }
        : note
    )
  })),

  canAccessNote: (id, password) => {
    const note = get().notes.find((n) => n.id === id);
    if (!note) return false;
    if (!note.password) return true;
    if (!password) return false;
    return verifyPassword(password, note.password);
  },

  canAccessFolder: (id, password) => {
    const folder = get().folders.find((f) => f.id === id);
    if (!folder) return false;
    if (!folder.password) return true;
    if (!password) return false;
    return verifyPassword(password, folder.password);
  },

  updateNote: (id, data, password) =>
    set((state) => {
      if (!get().canAccessNote(id, password)) return state;

      const note = state.notes.find((n) => n.id === id);
      if (!note) return state;

      let wordCount = note.wordCount;
      let readingTime = note.readingTime;
      if (data.content) {
        const text = data.content.replace(/<[^>]*>/g, ' ');
        wordCount = text.trim().split(/\s+/).length;
        readingTime = wordCount / 200;
      }

      const updatedNote = {
        ...note,
        ...data,
        updatedAt: new Date().toISOString(),
        version: note.version + 1,
        wordCount,
        readingTime,
        lastAccessedAt: new Date().toISOString(),
      };

      return {
        notes: state.notes.map((n) => (n.id === id ? updatedNote : n)),
        noteVersions: [
          ...state.noteVersions,
          {
            id: crypto.randomUUID(),
            noteId: id,
            content: updatedNote.content,
            title: updatedNote.title,
            createdAt: new Date().toISOString(),
            version: updatedNote.version,
          },
        ],
      };
    }),

  addNote: (note) =>
    set((state) => {
      const text = note.content?.replace(/<[^>]*>/g, ' ') || '';
      const wordCount = text.trim().split(/\s+/).length;
      const readingTime = wordCount / 200;

      const newNote = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        version: 1,
        wordCount,
        readingTime,
        color: null,
        labels: [],
        password: null,
        ownerId: null,
      } as Note;

      return {
        notes: [...state.notes, newNote],
        noteVersions: [
          ...state.noteVersions,
          {
            id: crypto.randomUUID(),
            noteId: newNote.id,
            content: newNote.content,
            title: newNote.title,
            createdAt: newNote.createdAt,
            version: 1,
          },
        ],
      };
    }),

  deleteNote: (id, password) =>
    set((state) => {
      if (!get().canAccessNote(id, password)) return state;
      return {
        notes: state.notes.filter((note) => note.id !== id),
        noteVersions: state.noteVersions.filter((version) => version.noteId !== id)
      };
    }),

  moveNote: (id, newFolderId, password) =>
    set((state) => {
      if (!get().canAccessNote(id, password)) return state;
      return {
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, folderId: newFolderId } : note
        )
      };
    }),

  toggleFavorite: (id) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    })),

  addFolder: (name, parentId, password) =>
    set((state) => ({
      folders: [...state.folders, {
        id: crypto.randomUUID(),
        name,
        parentId,
        createdAt: new Date().toISOString(),
        password: password ? hashPassword(password) : null,
        ownerId: null,
        labels: [],
        color: null,
      }]
    })),

  updateFolder: (id, name, password) =>
    set((state) => {
      if (!get().canAccessFolder(id, password)) return state;
      return {
        folders: state.folders.map((folder) =>
          folder.id === id ? { ...folder, name } : folder
        )
      };
    }),

  deleteFolder: (id, password) =>
    set((state) => {
      if (!get().canAccessFolder(id, password)) return state;
      return {
        folders: state.folders.filter((folder) => folder.id !== id),
        notes: state.notes.filter((note) => note.folderId !== id)
      };
    })
}));
