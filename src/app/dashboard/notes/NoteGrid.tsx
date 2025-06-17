import React from "react";

import Link from "next/link";

import { useDispatch } from "react-redux";
import { Note } from "@/types";

import { deleteNote } from "@/actions/note-actions";
import { removeNote } from "@/store/notes/notesSlice";

import { CalendarClock, Trash2 } from "lucide-react";

interface NoteGridProps {
  note: Note;
  index: number;
}

export const NoteGrid: React.FC<NoteGridProps> = React.memo(
  ({ note, index }) => {
    const dispatch = useDispatch();

    const handleDeleteNote = async (note: Note) => {
      if (
        window.confirm(
          `¿Estás seguro de que deseas eliminar la nota: ${note.title}?`
        )
      ) {
        try {
          await deleteNote(note.id);
          dispatch(removeNote(note.id));
        } catch (error) {
          console.error("Error al eliminar la nota", error);
        }
      }
    };

    const removeHTMLTags = (htmlContent: string) => {
      if (!htmlContent) return "";

      return htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    };

    return (
      <div
        className="card-notes rounded-lg"
        style={{ animationDelay: `${index * 0.02}s` }}
      >
        <div className="bg-light rounded-lg shadow-md flex flex-col">
          <div
            className="flex flex-row items-center justify-between rounded-t-lg p-5 filter brightness-[95%] note-title"
            style={{ backgroundColor: `${note.color}` }}
          >
            <span
              className="text-[1.2rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: `${note.color}`, filter: "brightness(3%)" }}
            >
              {note.title}
            </span>

            <div className="ml-4">
              <Trash2
                onClick={() => handleDeleteNote(note)}
                className={`hover:rounded-md hover:bg-[#00000016] p-[5px] brightness-0 z-10 cursor-pointer hover:transition-all hover:duration-300`}
                color={`${note.color}`}
                size={30}
              />
            </div>
          </div>

          <Link href={`${`/dashboard/notes/${note.id}`}`}>
            <div className="p-5">
              <span className="text-[.9rem] font-thin text-light-dark h-10 max-h-10 text-clamp-2 select-none">
                {removeHTMLTags(note.content).slice(0, 80)}
              </span>

              <div className="flex flex-row gap-2 pb-1 pt-5 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="w-max max-w-full rounded-xl border border-gray-500 py-1 px-3 font-light text-xs text-light bg-black select-none text-ellipsis overflow-hidden hitespace-nowrap">
                  {note.tagItem}
                </span>

                <span className="w-max max-w-full rounded-xl border border-gray-500 py-1 px-2 font-light text-xs text-black select-none text-ellipsis overflow-hidden hitespace-nowrap">
                  {(note.tag as any)?.name}
                </span>
              </div>
            </div>

            <div className=" bg-light-light flex justify-between px-5 py-2 rounded-b-lg">
              <CalendarClock size={17} color="black" />
              <span className="font-extralight text-sm text-black whitespace-nowrap overflow-hidden text-ellipsis select-none">
                {new Date(note.createdAt).toLocaleString("es-ES", {
                  dateStyle: "short",
                  timeStyle: "short",
                  timeZone: "America/Argentina/Buenos_Aires",
                })}
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
);
