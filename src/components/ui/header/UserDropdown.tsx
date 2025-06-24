"use client";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";

interface Props {
  handleLogout: () => void;
}

const UserDropdown = ({ handleLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainContent = document.querySelector(".main-content") as HTMLElement;
    const noteContent = document.querySelector(".notes-content") as HTMLElement;
    const navigatorContent = document.querySelector(
      ".navigator"
    ) as HTMLElement;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    const applyBlurEffect = (isOpen: boolean) => {
      const blurValue = isOpen ? "blur(25px)" : "blur(0px)";
      const overflowValue = isOpen ? "hidden" : "auto";

      if (noteContent) {
        noteContent.style.transition = "filter 0.2s ease-in-out";
        noteContent.style.filter = blurValue;
      }

      if (navigatorContent) {
        navigatorContent.style.transition = "filter 0.2s ease-in-out";
        navigatorContent.style.filter = blurValue;
      }

      if (mainContent) {
        mainContent.style.transition = "filter 0.2s ease-in-out";
        mainContent.style.filter = blurValue;
      }

      document.body.style.overflow = overflowValue;
    };

    applyBlurEffect(isOpen);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-full border-[1px] border-[var(--secondary-light)] hover:bg-[var(--hover-bg)] transition"
      >
        <User className="text-[var(--text-primary)]" size={17} />
      </button>

      {isOpen && (
        <div className="fixed right-5 mt-2 w-48 bg-[var(--primary)] shadow-2xl rounded-lg border border-[var(--secondary-light)] z-[100]">
          <ul className="py-1">
            <li className="flex items-center justify-between px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointer font-extralight text-[var(--text-primary)]">
              <span>Perfil</span>

              <User size={17} />
            </li>
            <li className="flex items-center justify-between px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointe font-extralight text-[var(--text-primary)]">
              <span>Configuración</span>

              <Settings size={17} />
            </li>

            <div className="mx-2 h-[0.5px] bg-[var(--secondary-light)]" />
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-[var(--hover-bg)] cursor-pointer font-extralight text-[--text-primary]"
              onClick={handleLogout}
            >
              <span>Cerrar sesión</span>
              <LogOut size={17} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
