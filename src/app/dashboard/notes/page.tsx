import { Navigation } from "@/components/notes/Navigation";

import NoteList from "./NoteList";

export const metadata = {
  title: "Mis Notas",
  description: "notas",
};

export default function Page({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const searchQuery = searchParams?.search ?? "";

  return (
    <div className="container-items">
      <Navigation searchQuery={searchQuery} />

      <div className="max-w-[1600px] mx-auto notes-content">
        <div className="mb-14 mt-64 md:mt-44 px-5">
          <NoteList searchQuery={searchQuery} />
        </div>
      </div>

      <div
        className="bg-[#ebebebc9] h-auto w-full fixed z-50 bottom-0 "
        style={{ boxShadow: "0px 39px 45px 100px #ebebeb" }}
      ></div>
    </div>
  );
}
