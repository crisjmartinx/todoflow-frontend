"use server";
import { getTagService } from "@/services/tagService";
import { TagCategory } from "@/types";

export const getTags = async (): Promise<TagCategory[] | null> => {
  const response = await getTagService();

  return response;
};
