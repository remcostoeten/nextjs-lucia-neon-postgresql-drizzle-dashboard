"use client";

import { CustomDropdown, DropdownAction } from "@/components/elements";
import { createFolder, deleteFolder, getFolders, updateFolder } from "@/lib/api/folders";
import { motion } from "framer-motion";
import {
  Edit,
  Folder,
  FolderOpen,
  PlusCircle,
  Search,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNotesStore, useSiteSettingsStore } from "stores";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from "ui";

type FolderType = {
  id: string;
  name: string;
  description: string | null;
};

export default function NotesSidebar() {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isEditFolderDialogOpen, setIsEditFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [editingFolder, setEditingFolder] = useState<FolderType | null>(null);
  const { selectedFolderId, setSelectedFolderId } = useNotesStore();
  const { disableSidebarAnimations } = useSiteSettingsStore();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const fetchedFolders = await getFolders();
    setFolders(fetchedFolders?.folders || []);
  };

  const handleCreateFolder = async () => {
    const formData = new FormData();
    formData.append("name", newFolderName);
    formData.append("description", newFolderDescription);
    await createFolder(formData);
    setIsNewFolderDialogOpen(false);
    setNewFolderName("");
    setNewFolderDescription("");
    fetchFolders();
  };

  const handleUpdateFolder = async () => {
    if (editingFolder) {
      const formData = new FormData();
      formData.append("id", editingFolder.id);
      formData.append("name", editingFolder.name);
      formData.append("description", editingFolder.description || "");
      await updateFolder(formData);
      setIsEditFolderDialogOpen(false);
      setEditingFolder(null);
      fetchFolders();
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    const formData = new FormData();
    formData.append("id", folderId);
    await deleteFolder(formData);
    fetchFolders();
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    }
  };

  const handleFolderSelect = (folderId: string | null) => {
    setSelectedFolderId(folderId);
  };

  const getFolderActions = (folder: FolderType): DropdownAction[] => [
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: () => {
        setEditingFolder(folder);
        setIsEditFolderDialogOpen(true);
      },
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDeleteFolder(folder.id),
    },
  ];

  const menuItems = [
    { icon: FolderOpen, text: "All Notes", id: null },
    { icon: Star, text: "Favorites", id: "favorites" },
    { icon: Tag, text: "Tags", id: "tags" },
  ];

  const getAnimationProps = (delay: number) => {
    if (disableSidebarAnimations) {
      return {};
    }
    return {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay },
    };
  };

  return (
    <div className="text-white p-4 h-full w-full overflow-y-auto">
      <motion.div
        {...getAnimationProps(0.1)}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsNewFolderDialogOpen(true)}
        >
          <PlusCircle size={24} />
        </Button>
      </motion.div>
      <motion.div
        {...getAnimationProps(0.2)}
        className="relative mb-6"
      >
        <Input
          type="text"
          placeholder="Search notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
      </motion.div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.text}
              {...getAnimationProps(0.1 * (index + 1))}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start ${selectedFolderId === item.id ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => handleFolderSelect(item.id)}
              >
                <item.icon size={20} className="mr-2" />
                <span>{item.text}</span>
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        {...getAnimationProps(0.5)}
        className="mt-8"
      >
        <h3 className="text-lg font-semibold mb-4">Folders</h3>
        <ul className="space-y-2">
          {folders.map((folder, index) => (
            <motion.li
              key={folder.id}
              {...getAnimationProps(0.6 + index * 0.1)}
              className="flex items-center justify-between"
            >
              <Button
                variant="ghost"
                className={`w-full justify-start ${selectedFolderId === folder.id ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => handleFolderSelect(folder.id)}
              >
                <Folder size={16} className="mr-2" />
                <span>{folder.name}</span>
              </Button>
              <CustomDropdown actions={getFolderActions(folder)} />
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <Dialog
        open={isNewFolderDialogOpen}
        onOpenChange={setIsNewFolderDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder Name"
          />
          <Input
            value={newFolderDescription}
            onChange={(e) => setNewFolderDescription(e.target.value)}
            placeholder="Folder Description (optional)"
          />
          <Button onClick={handleCreateFolder}>Create Folder</Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditFolderDialogOpen}
        onOpenChange={setIsEditFolderDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
          </DialogHeader>
          <Input
            value={editingFolder?.name || ""}
            onChange={(e) => setEditingFolder(prev => prev ? { ...prev, name: e.target.value } : null)}
            placeholder="Folder Name"
          />
          <Input
            value={editingFolder?.description || ""}
            onChange={(e) => setEditingFolder(prev => prev ? { ...prev, description: e.target.value } : null)}
            placeholder="Folder Description (optional)"
          />
          <Button onClick={handleUpdateFolder}>Update Folder</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
