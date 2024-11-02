export type Folder = {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  password: string | null;
  ownerId: string | null;
  labels: string[];
  color: string | null;
}

export type Note = {
  id: string;
  title: string;
  content: string;
  folderId: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  password: string | null;
  labels: string[];
  ownerId: string | null;
  version: number;
  color: string | null;
  lastAccessedAt: string | null;
  wordCount: number;
  readingTime: number;
}
