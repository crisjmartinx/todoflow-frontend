import { addNote } from "@/store/notes/notesSlice";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

interface UseNoteAutoSaveProps {
  formData: {
    title: string;
    content: string;
    selectedItem: any;
    isPinned: boolean;
    isArchived: boolean;
  };
  createData: (data: any) => Promise<any>;
  updateData: (id: string, data: any) => Promise<any>;
  delay?: number;
  setLoadingSave: (loading: boolean) => void;
  noteId?: string;
}

export const useNoteAutoSave = ({
  formData,
  createData,
  updateData,
  delay = 1000,
  setLoadingSave,
  noteId,
}: UseNoteAutoSaveProps) => {
  const [dataId, setDataId] = useState<string | undefined>(noteId);
  const isFirstRender = useRef(true);
  const initialFormData = useRef(formData);

  const dispatch = useDispatch();

  const hasFormChanged = () => {
    return JSON.stringify(initialFormData.current) !== JSON.stringify(formData);
  };

  const autoSave = async () => {
    if (!formData.title.trim() && !formData.content.trim()) return;
    if (!hasFormChanged()) return;

    try {
      const newNote = {
        title: formData.title,
        content: formData.content,
        tag: formData.selectedItem?.name ? [formData.selectedItem.name] : [],
        isPinned: formData.isPinned,
        isArchived: formData.isArchived,
      };

      if (dataId) {
        await updateData(dataId, newNote);
      } else {
        const createdData = await createData(newNote);
        setDataId(createdData.id);

        if (createdData) {
          dispatch(
            addNote({
              ...createdData,
              id: createdData.id,
            })
          );
        }
      }

      setLoadingSave(false);
      initialFormData.current = formData;
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (formData.title && formData.content && formData.selectedItem) {
      if (hasFormChanged()) {
        setLoadingSave(true);
        const timeout = setTimeout(autoSave, delay);
        return () => clearTimeout(timeout);
      }
    }
  }, [formData, delay]);

  return { dataId };
};
