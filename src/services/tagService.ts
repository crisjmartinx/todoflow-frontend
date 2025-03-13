import axios from "axios";

import { getServerSession } from "next-auth";
import { TagCategory } from "@/types";
import { authOptions } from "@/lib/auth";

export const getTagService = async (): Promise<TagCategory[] | null> => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!token) {
    console.error("No hay token disponible");
    return null;
  }

  try {
    const response = await axios.get<TagCategory[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`,
      {
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
