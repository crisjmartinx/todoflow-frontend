"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

import { getNotes } from "@/actions/note-actions";
import { Note } from "@/types";
import { RootState } from "@/store";
import {
  setNotes,
  setPage,
  setLoading,
  addNote,
} from "@/store/notes/notesSlice";

import { NoteGrid } from "./NoteGrid";
import { SkeletonCard } from "@/components/notes/SkeletonCard";
import { OctagonAlert } from "lucide-react";

interface NoteListProps {
  searchQuery?: string;
}

const NoteList: React.FC<NoteListProps> = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { notes, total, loading, page } = useSelector(
    (state: RootState) => state.notes
  );

  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({ threshold: 0 });

  const fetchNotes = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const response = await getNotes(20, 0, searchQuery);
      if (!response || !response.notes || !Array.isArray(response.notes)) {
        throw new Error("Error al obtener notas");
      }

      dispatch(setNotes({ notes: response.notes, total: response.total }));
      setError(null);
    } catch {
      setError("Error al cargar las notas, por favor intenta de nuevo.");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, searchQuery]);

  useEffect(() => {
    dispatch(setNotes({ notes: [], total: 0 }));
    dispatch(setPage(0));
  }, [searchQuery, dispatch]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const loadMoreItems = useCallback(async () => {
    if (loading || notes.length >= total) return;

    dispatch(setLoading(true));
    try {
      const nextPage = page + 1;
      const offset = nextPage * 10;
      const response = await getNotes(10, offset, searchQuery);

      if (response && response.notes) {
        response.notes.forEach((note: Note) => dispatch(addNote(note)));
        dispatch(setPage(nextPage));
      }
    } catch {
      setError("No se pudieron cargar más notas.");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, loading, notes.length, total, page, searchQuery]);

  useEffect(() => {
    if (inView) {
      loadMoreItems();
    }
  }, [inView, loadMoreItems]);

  if (loading && notes.length === 0) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 py-8">
        {Array.from({ length: 15 }).map((_, index) => (
          <SkeletonCard key={`skeleton-initial-${index}`} />
        ))}
      </div>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <div className="container mx-auto py-8 max-w-[1600px]">
        <p className="text-gray-500 text-center text-xl">
          No se encontraron notas
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-fit flex items-center gap-2 flex-wrap">
        <OctagonAlert className="text-red-500" />
        <p className="text-red-500 font-medium text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8 max-w-[1600px]">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {notes.map((note, index) => (
            <NoteGrid key={note.id} index={index} note={note} />
          ))}
        </div>

        {loading && (
          <div className="mt-4 pb-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={`skeleton-more-${index}`} />
            ))}
          </div>
        )}
      </div>

      <div ref={ref} className="mt-8 pb-8"></div>
    </>
  );
};

export default NoteList;
