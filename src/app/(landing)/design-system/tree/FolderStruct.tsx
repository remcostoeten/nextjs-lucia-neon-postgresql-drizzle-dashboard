// This is a Server Component

import { getFolders } from "@/lib/actions/folders";

export default async function FolderStructure() {
    const result = await getFolders();

    if ('error' in result) {
        return <div>Error: {result.error}</div>;
    }

    // Serialize the folders data
    const serializedFolders = result.folders.map(folder => ({
        id: folder.id,
        name: folder.name,
        color: folder.color,
        description: folder.description,
        parentId: folder.parentId,
        // Omit methods or non-serializable properties
    }));

    return <FolderList folders={serializedFolders} />;
}
