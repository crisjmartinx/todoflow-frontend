"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { NewNote } from "@/app/dashboard/notes/NewNote";
import { useKeyPress } from "@/hooks/useKeyPress";
import { AnimatedButton } from "../ui/buttons/AnimatedButton";

import { Plus, Search, X } from "lucide-react";

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
            className="text-light-dark text-[2rem] font-bold w-full md:w-auto mb-1 md:mb-0 whitespace-nowrap overflow-hidden text-ellipsis"
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
            } md:mb-0 w-full md:w-auto bg-light`}
          >
            {!addNoteModalOpen && (
              <>
                <Search size={17} className="text-light-dark" />

                <input
                  type="text"
                  placeholder="Buscar notas..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="focus:outline-none bg-light text-[13px] box-border text-light-dark w-full md:w-64 whitespace-nowrap overflow-hidden text-ellipsis"
                />

                {search && (
                  <X
                    size={17}
                    className="text-light-dark cursor-pointer"
                    onClick={() => setSearch("")}
                  />
                )}
              </>
            )}
          </div>

          <AnimatedButton
            text="Agregar nota"
            openText="Listo"
            isOpen={addNoteModalOpen}
            onClick={handleToggleAddNoteModal}
            loading={loadingSave}
            windowWidth={window.innerWidth}
            icon={<Plus size={17} />}
            smallWidth={6}
            largeWidth={9}
          />
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
