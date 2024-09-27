import { checkAuth } from "@/lib/auth/utils";
import { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "ui";
import { CreateFolderButton } from "./_components/create-folder-button";
import { CreateNoteButton } from "./_components/create-note-button";
import NotesAndFolders from "./notes-and-folders";

export const metadata: Metadata = {
  title: "Notes Dashboard",
  description: "Manage your notes and folders",
};

export default async function NotesPage() {
  await checkAuth();

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">Notes</CardTitle>
            <div className="flex space-x-2">
              <CreateFolderButton />
              <CreateNoteButton />
            </div>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading notes and folders...</div>}>
              <NotesAndFolders />
            </Suspense>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
