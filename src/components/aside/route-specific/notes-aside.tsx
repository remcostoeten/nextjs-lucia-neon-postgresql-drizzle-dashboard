"use client";

import { getFolders } from "@/lib/api/folders";
import { motion } from "framer-motion";
import {
  Folder,
  FolderOpen,
  PlusCircle,
  Search,
  Star,
  Tag,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FolderType {
  id: string;
  name: string;
}

const NotesSidebar: React.FC = () => {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      const fetchedFolders = await getFolders();
      setFolders(fetchedFolders?.folders || []);
    };

    fetchFolders();
  }, []);

  const menuItems = [
    { icon: FolderOpen, text: "All Notes" },
    { icon: Star, text: "Favorites" },
    { icon: Tag, text: "Tags" },
  ];

  return (
    <div className="text-white p-4 h-full w-[230px] overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold">Notes</h2>
        <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
          <PlusCircle size={24} />
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mb-6"
      >
        <input
          type="text"
          placeholder="Search notes"
          className="w-full p-2 pl-10 bg-card border-outline rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
      </motion.div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <a
                href="#"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-card border-outline transition-colors duration-200"
              >
                <item.icon size={20} className="text-gray-400" />
                <span>{item.text}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Notes</h3>
        <ul className="space-y-2">
          {["Project Ideas", "Meeting Notes", "To-Do List"].map(
            (note, index) => (
              <motion.li
                key={note}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-sm hover:bg-card border-outline p-2 rounded-md cursor-pointer transition-colors duration-200"
              >
                {note}
              </motion.li>
            ),
          )}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h3 className="text-lg font-semibold mb-4">Folders</h3>
        <ul className="space-y-2">
          {folders.map((folder, index) => (
            <motion.li
              key={folder.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-sm hover:bg-card border-outline p-2 rounded-md cursor-pointer transition-colors trans-all"
            >
              <Link
                href={`/dashboard/notes/folders/${folder.id}`}
                className="flex items-center space-x-3"
              >
                <Folder size={16} className="text-zinc-400" />
                <span className="text-subtitle">{folder.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default NotesSidebar;
