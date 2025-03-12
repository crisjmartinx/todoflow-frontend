import { getNote } from "@/actions/note-actions";
import { Quill } from "@/components/notes/Quill";
import { Note } from "@/types";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const fetchGetNote = async (id: string): Promise<Note> => {
  try {
    const note = await getNote(id);

    if (!note) {
      throw new Error("La nota no existe");
    }

    return note as Note;
  } catch (error) {
    notFound();
  }
};

export async function generateMetadata({ params }: Props) {
  try {
    const note = await fetchGetNote(params.id);

    return {
      title: `Nota - ${note.title.slice(0, 20)}`,
      description: `${note.content.slice(0, 40)}...`,
    };
  } catch (error) {
    return {
      title: "Nota no encontrada",
      description: "La nota que buscas no existe.",
    };
  }
}

export default async function page({ params }: Props) {
  const note = (await getNote(params.id)) as Note;

  return (
    <div className="container-items w-full h-auto my-[4.6rem] md:my-[4.6rem]">
      <div className="text-black" style={{ width: "-webkit-fill-available" }}>
        <div className=" w-full h-auto text-white bg-[#292929] py-4">
          <Link href="/dashboard/notes">
            <MoveLeft className="ml-6 inline-block align-middle hover:scale-105 duration-300 " />
          </Link>

          <span className="ml-3 inline-block align-middle font-medium text-lg">
            Notes
          </span>
        </div>

        <Quill note={note} />
      </div>
    </div>
  );
}
