import axios from "axios";

import { getServerSession } from "next-auth";
import { ApiResponse } from "@/types/note-interface";
import { Note } from "@/types";
import { authOptions } from "@/lib/auth";

export const createNoteService = async ({
  title,
  content,
  tag,
  isPinned,
  isArchived,
}: Note): Promise<Note | null> => {
  const sesion = await getServerSession(authOptions);
  const token = sesion?.user?.token;

  if (!token) {
    console.error("No hay token disponible");

    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tag, isPinned, isArchived }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error al crear la nota: ${response.status} ${response.statusText}`
      );
    }

    const newNote = await response.json();
    return newNote;
  } catch (error) {
    console.error("Error en createNoteService:", error);
    return null;
  }
};

export const deleteNoteService = async (id: string): Promise<void> => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!token) {
    console.error("No hay token disponible");
    return;
  }
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${id}`,
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Error al eliminar la nota: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error en deleteNoteService:", error);
    throw error;
  }
};

export const updateNoteService = async (
  id: string,
  { title, content }: Partial<Note>
): Promise<Note> => {
  const body: Partial<Note> = { title, content };

  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  try {
    const response = await axios.patch<Note>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${id}`,

      { title, content },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar la nota: ${response.status} ${response.statusText}`
      );
    }

    const updatedNote = response.data;

    return updatedNote;
  } catch (err) {
    console.error("Error updating note:", err);
    throw err;
  }
};

export const getAllNotesService = async (
  limit: number,
  offset: number,
  search?: string
): Promise<ApiResponse | null> => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!token) {
    console.error("No hay token disponible");
    return null;
  }

  try {
    const response = await axios.get<ApiResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`,
      {
        params: { limit, offset, search },
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Error en getAllNotesService:", error.message);
    }
    return null;
  }
};

export const getNoteService = async (id: string) => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!token) {
    throw new Error("No se encontró un token de autenticación");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener la nota:", error);
  }
};
