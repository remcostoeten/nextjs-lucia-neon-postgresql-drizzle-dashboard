import React, { useState } from 'react';
import { Button, ColorPicker, Dialog, DialogContent, DialogHeader, DialogTitle, Input } from 'ui';

type EditFolderDialogProps = {
    folder: {
        id: string;
        name: string;
        color: string;
    };
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, name: string, color: string) => void;
}

export function EditFolderDialog({ folder, isOpen, onClose, onSave }: EditFolderDialogProps) {
    const [name, setName] = useState(folder.name)
    const [color, setColor] = useState(folder.color)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSave(folder.id, name, color)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Folder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Folder Name"
                        required
                    />
                    <ColorPicker color={color} onChange={setColor} />
                    <Button type="submit">Save Changes</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
