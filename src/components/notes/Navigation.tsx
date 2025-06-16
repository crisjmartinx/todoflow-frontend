"use client";

import { NewNote } from "@/app/dashboard/notes/NewNote";
import { useKeyPress } from "@/hooks/useKeyPress";
import { Plus, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Navigation = ({ searchQuery }: { searchQuery: string }) => {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);

  const [addNoteModalOpen, setAddNoteModalOpen] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleAddNoteModal = () => {
    if (addNoteModalOpen) {
      setIsClosing(true);
    } else {
      setAddNoteModalOpen(true);
    }
  };

  useKeyPress("Escape", handleToggleAddNoteModal, addNoteModalOpen);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router]);

  return (
    <>
      <nav className="navigator fixed top-[4.6rem] bg-transparent backdrop-blur-2xl shadow-md z-10 w-full py-4 px-5 select-none">
        <div className="flex justify-between items-center flex-wrap flex-col md:flex-row max-w-[1560px] mx-auto">
          <h3
            className="text-black text-[2rem] font-bold w-full md:w-auto mb-1 md:mb-0 whitespace-nowrap overflow-hidden text-ellipsis"
            style={{
              opacity: addNoteModalOpen ? 0 : 1,
              transition:
                "opacity 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: addNoteModalOpen
                ? "translateY(-10px)"
                : "translateY(0)",
              transitionDelay: addNoteModalOpen ? "0.1s" : "0s",
              transitionProperty: "opacity, transform",
            }}
          >
            Notas
          </h3>

          <div
            className={`flex items-center border gap-2 rounded-lg ml-0 md:ml-auto mr-0 md:mr-5 ${
              addNoteModalOpen ? "hidden" : "p-2 mb-4"
            } md:mb-0 w-full md:w-auto bg-[#fff]`}
          >
            {!addNoteModalOpen && (
              <>
                <Search size={17} className="text-gray-500" />

                <input
                  type="text"
                  placeholder="Buscar notas..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="focus:outline-none border-[#dbdbdb] bg-[#fff] text-[13px] box-border text-black w-full md:w-64 whitespace-nowrap overflow-hidden text-ellipsis"
                />

                {search && (
                  <X
                    size={17}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setSearch("")}
                  />
                )}
              </>
            )}
          </div>

          <div
            className="flex items-center justify-center gap-2 text-white bg-black font-extralight text-sx px-3 py-2 rounded-lg transition"
            style={{
              width:
                windowWidth < 768 ? "100%" : addNoteModalOpen ? "6rem" : "9rem",
              transition: "width 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onClick={handleToggleAddNoteModal}
            role="button"
            tabIndex={0}
            aria-label="Agregar nota"
          >
            {!loadingSave ? (
              <>
                <div>
                  <Plus
                    size={17}
                    className={`transition duration-300 ${
                      addNoteModalOpen ? "transform rotate-45" : ""
                    }`}
                  />
                </div>

                <div className="whitespace-nowrap overflow-hidden leading-none font-light">
                  {addNoteModalOpen ? (
                    <div className="slide-up" key="ready">
                      <span className="text-sm">Listo</span>
                    </div>
                  ) : (
                    <div className="slide-up" key="add">
                      <span className="text-sm">Agregar nota</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-[0.15rem]">
                <div className="spinner-save-data-button"></div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {addNoteModalOpen && (
        <NewNote
          isOpen={addNoteModalOpen}
          setOpen={setAddNoteModalOpen}
          isClosing={isClosing}
          setIsClosing={setIsClosing}
          setLoadingSave={setLoadingSave}
          loadingSave={loadingSave}
        />
      )}
    </>
  );
};
