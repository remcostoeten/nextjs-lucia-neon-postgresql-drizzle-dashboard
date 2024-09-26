import {
  folders,
  insertFolderSchema,
  selectFolderSchema,
  type Folder,
} from "./folders";
import { insertNoteSchema, notes, selectNoteSchema, type Note } from "./notes";
import {
  insertSessionSchema,
  insertUserSchema,
  selectSessionSchema,
  selectUserSchema,
  sessions,
  users,
  type Session,
  type User,
} from "./users";

export {
  folders,
  insertFolderSchema,
  insertNoteSchema,
  insertSessionSchema,
  insertUserSchema,
  notes,
  selectFolderSchema,
  selectNoteSchema,
  selectSessionSchema,
  selectUserSchema,
  sessions,
  users,
};

export type { Folder, Note, Session, User };
