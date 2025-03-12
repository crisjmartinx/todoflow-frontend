"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
}

const Navigation: React.FC<Props> = ({ title }) => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      const rect = navRef.current.getBoundingClientRect();
      const header = document.getElementById("header");
      const headerHeight = header?.offsetHeight || 0;
      const stickyPoint = rect.top + window.scrollY - headerHeight;

      const newStickyState = window.scrollY > stickyPoint;
      if (newStickyState !== isSticky) {
        setIsSticky(newStickyState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <nav
      className={`bg-transparent backdrop-blur-2xl w-full stickyTitle mb-5 ${
        isSticky ? "sticky" : ""
      }`}
      style={{ zIndex: 100 }}
      ref={navRef}
    >
      <div className="mx-auto max-w-[1600px] justify-between px-5 md:px-5 py-5 items-center">
        <h3 className="text-black text-3xl font-bold select-none">{title}</h3>
      </div>
    </nav>
  );
};

export default Navigation;
