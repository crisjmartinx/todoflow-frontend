import { useDispatch, useSelector } from "react-redux";
import { setLoading, setNotes } from "@/store/notes/notesSlice";
import { RootState } from "@/store";
import { getNotes } from "@/actions/note-actions";
import { useEffect, useState } from "react";

export const useTotalNotes = () => {
  const dispatch = useDispatch();
  const total = useSelector((state: RootState) => state.notes.total);
  const loading = useSelector((state: RootState) => state.notes.loading);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      if (total === 0 && !loading && !fetched) {
        setFetched(true);
        dispatch(setLoading(true));
        try {
          const response = await getNotes(1, 0);

          const data = Array.isArray(response)
            ? { notes: response, total: response.length }
            : response ?? { notes: [], total: 0 };

          if (data.notes) {
            dispatch(setNotes({ notes: data.notes, total: data.total }));
          }
        } catch (error) {
          console.error("Error al cargar las notas:", error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    loadNotes();
  }, [dispatch, total, loading, fetched]);

  return { total, loading };
};
