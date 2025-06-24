"use client";

import {
  BellRing,
  BookOpenText,
  House,
  ListChecks,
  Notebook,
  Package,
} from "lucide-react";

import { SidebarMenuItems } from "./SidebarMenuItems";

export default function Sidebar() {
  const menuItems = [
    {
      id: 0,
      icon: <House className="text-[var(--primary)]" size={18} />,
      name: "Inicio",
      path: "/dashboard/main",
    },
    {
      id: 1,
      icon: <Notebook className="text-[var(--primary)]" size={18} />,
      name: "Notas",
      path: "/dashboard/notes",
    },
    {
      id: 2,
      icon: <Package className="text-[var(--primary)]" size={18} />,
      name: "Projectos",
      path: "/dashboard/projects",
    },
    {
      id: 3,
      icon: <ListChecks className="text-[var(--primary)]" size={18} />,
      name: "Tareas",
      path: "/dashboard/tasks",
    },
    {
      id: 4,
      icon: <BellRing className="text-[var(--primary)]" size={18} />,
      name: "Recordatorios",
      path: "/dashboard/reminders",
    },
    {
      id: 6,
      icon: <BookOpenText className="text-[var(--primary)]" size={18} />,
      name: "Aprendizaje",
      path: "/dashboard/learn",
    },
  ];

  return (
    <aside className="overflow-hidden fixed top-[4.4rem] h-full sidebar z-[60] border-r-[0.5px] border-[var(--secondary-light)]">
      <div className=" h-full bg-[var(--primary)]">
        <nav className="pt-7 px-2 md:px-4">
          {menuItems.map((item) => (
            <SidebarMenuItems key={item.path} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
