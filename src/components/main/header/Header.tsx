"use client";

import { signOut, useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const { data: session } = useSession();

  const handleLogout = () => {
    if (session?.user) {
      signOut();
    }
  };

  return (
    <header
      className="bg-light-light py-5 px-5 md:px-5 overflow-hidden fixed w-full top-0 z-[200]"
      id="header"
    >
      <div className="flex justify-between items-center">
        <span className="text-light-dark text-2xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          Mi Dashboard
        </span>

        <div className="flex items-center gap-5">
          <span className="text-light-dark text-lg font-extralight max-w-50 whitespace-nowrap overflow-hidden text-ellipsis">
            {session?.user && <>{session?.user.name}</>}
          </span>

          <UserDropdown handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
