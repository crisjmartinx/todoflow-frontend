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
        className=" p-2 rounded-full border-[1px] border-[black] hover:bg-gray-200 transition"
      >
        <User color="black" size={17} />
      </button>

      {isOpen && (
        <div className="fixed right-5 mt-2 w-48 bg-white shadow-2xl rounded-lg border z-[100]">
          <ul className="py-1">
            <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer font-extralight">
              <span>Perfil</span>

              <User size={17} />
            </li>
            <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointe font-extralight">
              <span>Configuración</span>

              <Settings size={17} />
            </li>

            <hr className="mx-2" />
            <li
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer font-extralight"
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
