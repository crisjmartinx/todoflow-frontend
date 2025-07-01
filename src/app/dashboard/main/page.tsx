"use client";

import Navigation from "@/components/main/navigation/Navigation";
import SummaryCard from "@/components/ui/cards/SummaryCard";

import { useTotalNotes } from "@/hooks/useTotalNotes";
import {
  BellRing,
  BookOpenText,
  CircleDollarSign,
  ListChecks,
  Lock,
  Notebook,
  Package,
} from "lucide-react";

export default function page() {
  const { total: totalNotes, loading: loadingNotes } = useTotalNotes();

  /**
   * TODO: === fetch these lists from an API or a global state ===
   */

  const lists = [
    {
      id: 0,
      name: "Notas",
      amount: totalNotes,
      loading: loadingNotes,
      color: "#dc354520",
      link: "/dashboard/notes",
      icon: <Notebook className="text-[var(--secondary)]" size={20} />,
    },
    {
      id: 1,
      name: "Projectos",
      amount: 0,
      color: "#28a72520",
      link: "/dashboard/projects",
      icon: <Package className="text-[var(--secondary)]" size={20} />,
    },
    {
      id: 2,
      name: "Tareas",
      amount: 0,
      color: "#007bff20",
      link: "/dashboard/tasks",
      icon: <ListChecks className="text-[var(--secondary)]" size={20} />,
    },
    {
      id: 3,
      name: "Recordatorios",
      amount: 0,
      color: "#fd7e1420",
      link: "/dashboard/reminders",
      icon: <BellRing className="text-[var(--secondary)]" size={20} />,
    },
    {
      id: 4,
      name: "Finanzas",
      amount: 0,
      color: "#e83e8c20",
      link: "/dashboard/finances",
      icon: <CircleDollarSign className="text-[var(--secondary)]" size={20} />,
    },
    {
      id: 5,
      name: "Aprendizaje",
      amount: 0,
      color: "#17a2b820",
      link: "/dashboard/learn",
      icon: <BookOpenText className="text-[var(--secondary)]" size={20} />,
    },
  ];

  return (
    <div className="h-auto mt-[4.6rem] md:mt-[4.6rem] container-items">
      <div className="overflow-x-clip">
        <section>
          <Navigation title="Mi Actividad" />

          <div className="p-5 mt-0 mx-auto max-w-[1600px]">
            <div className="grid gap-4 mb-20 md:grid-cols-2 lg:grid-cols-4">
              {lists.map((list, index) => (
                <SummaryCard key={list.id} index={index} {...list} />
              ))}
            </div>
            <div className="h-[1.5px] bg-[var(--secondary-light)] w-auto rounded-xl my-2 mx-1"></div>
          </div>
        </section>

        <section>
          <Navigation title="Dashboard 2" />
          <div className="p-5 mt-0 mx-auto mb-0 max-w-[1600px]">
            <svg style={{ display: "none" }}>
              <filter id="glass-distortion">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.005"
                  numOctaves="1"
                  result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
              </filter>
            </svg>

            <div className="bg-[#0000001b] card-main-banner reflection rounded-xl border-[0.005px] border-transparent mb-20 hover:transform hover:none">
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="h-72 bg-transparent hover:bg-[var(--hover-bg)] glass-content">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Lock className="text-[var(--secondary)]" size={40} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
