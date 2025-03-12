"use client";

import { createNote, updateNote } from "@/actions/note-actions";
import { useNoteAutoSave } from "@/hooks/useAutoSave";
import { Note } from "@/types";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

interface Props {
  note: Note;
}

export const Quill = ({ note }: Props) => {
  const [content, setContent] = useState(note.content || "");
  const [title, setTitle] = useState(note.title || "");

  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  useEffect(() => {
    setContent(note.content);
    setTitle(note.title);
  }, [note.content, note.title]);

  useNoteAutoSave({
    formData: {
      title,
      content,
      selectedItem: note.tag,
      isPinned: note.isPinned,
      isArchived: note.isArchived,
    },
    noteId: note.id,
    createData: createNote,
    updateData: updateNote,
    delay: 1000,
    setLoadingSave: setLoadingSave,
  });

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],

        ["blockquote", "code-block"],

        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }],

        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

        [{ script: "sub" }, { script: "super" }],

        [{ indent: "-1" }, { indent: "+1" }],

        [{ direction: "rtl" }],

        [{ size: ["small", false, "large", "huge"] }],

        [{ color: [] }, { background: [] }],

        [{ font: [] }],

        [{ align: [] }],

        ["clean"],
      ],
    },
  };

  return (
    <>
      <form className="flex flex-col bg-[#FFF] p-6 rounded-[5px] w-full h-full">
        <div className="flex w-full items-center justify-between mb-5">
          <input
            type="text"
            className="bg-white text-2xl font-semibold text-gray-600 focus:outline-none block overflow-hidden whitespace-nowrap overflow-ellipsis w-full"
            placeholder="Titulo nota..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-row items-center gap-[10px] w-fit cursor-pointer hover:bg-gray-800 py-[0.45rem] px-3 rounded-md border bg-[#292929] text-white">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: (note.tag as any).color }}
            ></div>
            <span className="text-sm font-extralight select-none leading-none w-max">
              {(note.tag as any).name}
            </span>
          </div>
        </div>

        <ReactQuill
          className="h-full"
          theme="snow"
          modules={modules}
          value={content}
          onChange={setContent}
        />
      </form>
    </>
  );
};
