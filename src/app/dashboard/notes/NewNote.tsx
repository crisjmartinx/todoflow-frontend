"use client";

import React, { useEffect, useRef, useState } from "react";

import { TagCategory, TagItem } from "@/types";

import { ChevronLeft, Tags } from "lucide-react";
import { Editor } from "@/components/Editor";
import { createNote, updateNote } from "@/actions/note-actions";
import { useNoteAutoSave } from "@/hooks/useAutoSave";
import { getTags } from "@/actions/tag-action";

interface NewNoteProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isClosing: boolean;
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSave: React.Dispatch<React.SetStateAction<boolean>>;
  loadingSave: boolean;
}

export const NewNote: React.FC<NewNoteProps> = ({
  isOpen,
  setOpen,
  isClosing,
  setIsClosing,
  setLoadingSave,
  loadingSave,
}: NewNoteProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false,
    isArchived: false,
    selectedItem: null as TagItem | null,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<TagCategory | null>(
    null
  );

  const [tags, setTags] = useState<TagCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [activateIA, setActivateIA] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();

        setTags(tags ?? []);
      } catch (error) {
        console.error("Error al obtener tags", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen && !isClosing) {
      modal.style.transition =
        "transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)";
      modal.style.transform = "translateY(0px)";
      document.body.style.overflow = "hidden";
    }

    if (isClosing) {
      modal.style.transition = "transform 0.2s ease-in-out";
      modal.style.transform = "translateY(1200px)";

      const handleTransitionEnd = () => {
        setOpen(false);
        setIsClosing(false);
      };

      modal.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        modal.removeEventListener("transitionend", handleTransitionEnd);
        document.body.style.overflow = "scroll";
      };
    }
  }, [isOpen, isClosing, setOpen, setIsClosing]);

  const handleCategoryClick = (category: TagCategory) => {
    setSelectedCategory(category);

    setShowCategories(false);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setShowCategories(false);
  };

  const handleRemoveTag = () => {
    setFormData((prev) => ({
      ...prev,
      selectedItem: null,
    }));
  };

  const handleSelectedItem = (item: TagItem) => {
    setFormData((prev) => ({
      ...prev,
      selectedItem: item,
      selectedCategory: null,
    }));
  };

  const handleInput = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  useNoteAutoSave({
    formData,
    createData: createNote,
    updateData: updateNote,
    delay: 1000,
    setLoadingSave: setLoadingSave,
  });

  return (
    <div
      ref={modalRef}
      className="container-modal bg-[#00000000] translate-y-[1200px] backdrop-blur-[100px] h-[-webkit-fill-available] w-[-webkit-fill-available] fixed z-[100] overflow-hidden flex justify-center items-center p-[0.3rem] top-[12.2rem] md:top-[9.6rem]"
      style={{
        background: activateIA
          ? `linear-gradient(125deg, rgba(255, 0, 92, 0.7), rgba(255, 121, 63, 0.7), rgba(255, 210, 0, 0.7), rgba(46, 196, 182, 0.7), rgba(36, 123, 160, 0.7), rgba(96, 17, 145, 0.7), rgba(255, 0, 153, 0.7), rgba(255, 77, 0, 0.7), rgba(255, 0, 92, 0.7), rgba(255, 178, 82, 0.7), rgba(0, 204, 255, 0.7), rgba(255, 165, 0, 0.7), rgba(170, 0, 255, 0.7), rgba(255, 51, 204, 0.7))`
          : "transparent",
        backgroundSize: "400% 400%",
        animation: "rotateBackground 8s linear infinite",
      }}
    >
      {loadingSave && <div className="loader"></div>}
      <form className="flex flex-col bg-[#FFF] p-6 rounded-[5px] w-full h-full">
        <input
          type="text"
          className="bg-white text-2xl font-semibold text-gray-600 pb-5 focus:outline-none block overflow-hidden whitespace-nowrap overflow-ellipsis"
          placeholder="Titulo nota..."
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        <div className="flex justify-start items-start gap-4">
          <button
            className="flex items-start space-x-2 w-auto border border-gray-200 rounded-lg p-1.5"
            type="button"
            onClick={() => setShowCategories((prev) => !prev)}
            style={{
              minHeight: showCategories ? "90px" : "0",
              overflow: "hidden",
              transition: showCategories
                ? "min-height 0.1s ease-in-out"
                : "min-height 0.1s ease-in-out",
              background: showCategories ? "#FAFAFA" : "#FFF",
            }}
          >
            <Tags style={{ color: "#484848", margin: "2px" }} size={16} />
            <span className="text-black font-semibold text-sm select-none">
              Tags
            </span>

            <div
              className="absolute left-[1.3rem] mt-8 rounded-r-lg rounded-bl-lg z-10 border border-gray-200"
              style={{
                width: showCategories ? "calc(100% - 63px)" : "0px",
                overflow: "hidden",
                transition: showCategories
                  ? "width 0.1s ease-in-out"
                  : "width 0.05s ease-in-out",
                whiteSpace: "nowrap",
                background: showCategories ? "#FAFAFA" : "#FFF",
                zIndex: 100,
              }}
            >
              {showCategories && (
                <div className="overflow-x-scroll scroll-hidden p-3">
                  {selectedCategory === null ? (
                    <ul className="flex gap-[0.3rem]">
                      {tags.map((category) => (
                        <li
                          key={`tag-category-${category.id}`}
                          className="flex flex-row items-center gap-[10px] cursor-pointer hover:bg-gray-800 py-[0.45rem] px-3 rounded-[0.5rem] border bg-black text-white shadow-md"
                          onClick={() => handleCategoryClick(category)}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm font-extralight select-none leading-none">
                            {category.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul
                      key={selectedCategory.id}
                      className="flex items-center gap-[0.3rem]"
                    >
                      <ChevronLeft
                        onClick={handleBack}
                        color="#000000"
                        className="mr-2"
                      />

                      {selectedCategory.items.map(
                        (item, index): React.ReactNode => (
                          <li
                            key={`tag-item-${index}`}
                            className="flex cursor-pointer hover:bg-gray-800 py-[0.45rem] px-3 rounded-[0.5rem] border bg-black text-white shadow-md"
                            onClick={() => handleSelectedItem(item)}
                          >
                            <span className="text-sm font-extralight select-none leading-none">
                              {item.name}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </button>

          {formData.selectedItem !== null && (
            <div
              className="relative group cursor-pointer py-[0.25rem] px-3 rounded-md border bg-black text-white transition-colors"
              onClick={handleRemoveTag}
            >
              <span className="text-sm font-extralight select-none leading-none transition-opacity duration-200 group-hover:opacity-0">
                {formData.selectedItem.name}
              </span>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-1 text-sm font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                x
              </span>
            </div>
          )}
        </div>

        <div className="pt-5">
          <span className="text-black font-semibold text-sm select-none">
            Nota
          </span>
        </div>

        <div className="flex-1 pt-2 relative group">
          <Editor handleInput={handleInput} content={formData.content} />
        </div>
      </form>
    </div>
  );
};
