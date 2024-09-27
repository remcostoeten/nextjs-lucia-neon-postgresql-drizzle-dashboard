"use client";

import { getFolders } from "@/lib/actions/folders";
import { useEffect, useState } from "react";

type FolderType = {
  id: string;
  name: string;
};

const FolderList: React.FC = () => {
  const [folders, setFolders] = useState<FolderType[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const fetchedFolders = await getFolders();
      setFolders(fetchedFolders?.folders || []);
    };

    fetchFolders();
  }, []);

  return (
    <div className="space-y-4">
      {folders.length > 0 ? (
        folders.map((folder) => (
          <div key={folder.id} className="p-2 border rounded">
            {folder.name}
          </div>
        ))
      ) : (
        <p>No folders found</p>
      )}
    </div>
  );
};

export default FolderList;
