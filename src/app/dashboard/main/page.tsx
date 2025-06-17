"use client";

import Card from "@/components/main/card";
import Navigation from "@/components/main/navigation/Navigation";
import { useTotalNotes } from "@/hooks/useTotalNotes";
import { Lock } from "lucide-react";

export default function page() {
  const { total: totalNotes, loading: loadingNotes } = useTotalNotes();

  const lists = [
    {
      id: 0,
      name: "Notas",
      amount: totalNotes,
      loading: loadingNotes,
      color: "#dc354520",
      link: "/dashboard/notes",
    },
    {
      id: 1,
      name: "Projectos",
      amount: 4,
      color: "#28a72520",
      link: "/dashboard/projects",
    },
    {
      id: 2,
      name: "Tareas",
      amount: 40,
      color: "#007bff20",
      link: "/dashboard/tasks",
    },
    {
      id: 3,
      name: "Recordatorios",
      amount: 40,
      color: "#fd7e1420",
      link: "/dashboard/reminders",
    },
    {
      id: 4,
      name: "Finanzas",
      amount: 40,
      color: "#e83e8c20",
      link: "/dashboard/finances",
    },
    {
      id: 5,
      name: "Aprendizaje",
      amount: 10,
      color: "#17a2b820",
      link: "/dashboard/learn",
    },
  ];

  return (
    <div className="h-auto my-[4.6rem] md:my-[4.6rem] container-items main-content">
      <div className="overflow-x-clip">
        <section>
          <Navigation title="Mi Actividad" />

          <div className=" p-5 mt-0 mx-auto max-w-[1600px]">
            <div className="grid gap-4 mb-20 md:grid-cols-2 lg:grid-cols-4">
              {lists.map((list, index) => (
                <Card key={list.id} index={index} {...list} />
              ))}
            </div>
            <div className="h-[1.5px] bg-light-dark w-auto rounded-xl my-2 mx-1"></div>
          </div>
        </section>

        <section>
          <Navigation title="Dashboard 2" />
          <div className="p-5 mt-0 mx-auto mb-0 max-w-[1600px]">
            <div className="card-main-banner reflection rounded-xl border border-gray-200 mb-20 hover:transform hover:none">
              <div className="h-72 bg-[#00000069]">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Lock className="text-light-dark" size={60} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
