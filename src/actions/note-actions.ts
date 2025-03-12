"use server";

import {
  createNoteService,
  deleteNoteService,
  getAllNotesService,
  getNoteService,
  updateNoteService,
} from "@/services/noteService";

import { Note } from "@/types";
import { ApiResponse } from "@/types/note-interface";
import { revalidatePath } from "next/cache";

export const createNote = async ({
  title,
  content,
  tag,
  isPinned,
  isArchived,
}: Omit<Note, "id" | "createdAt" | "updatedAt" | "color" | "tagItem">) => {
  const newNote: Note = {
    title,
    content,
    isPinned,
    isArchived,
    tag,
    tagItem: "",
    id: "",
    createdAt: "",
    updatedAt: "",
    color: "",
  };

  revalidatePath("/dashboard/notes");

  return await createNoteService(newNote);
};

export const deleteNote = async (id: string): Promise<void> => {
  const result = await deleteNoteService(id);

  revalidatePath("/dashboard/notes");

  return result;
};

export const updateNote = async (
  id: string,
  {
    title,
    content,
  }: Omit<Note, "id" | "createdAt" | "updatedAt" | "color" | "tagItem">
) => {
  const updatedNoteData: Partial<Note> = { title, content };

  const updatedNote = await updateNoteService(id, updatedNoteData);

  if (updatedNote) {
    revalidatePath("/dashboard/notes");
  }

  return updatedNote;
};

export const getNotes = async (
  limiit: number = 20,
  offset: number = 1,
  search?: string
): Promise<ApiResponse | null> => {
  const response = await getAllNotesService(limiit, offset, search);

  if (response?.notes?.length) {
    revalidatePath("/dashboard/notes");
    revalidatePath("/dashboard/main");
  } else {
    console.warn("No se encontraron notas, omitiendo revalidación.");
  }

  return response;
};

export const getNote = async (id: string) => {
  const response = await getNoteService(id);

  return response;
};
