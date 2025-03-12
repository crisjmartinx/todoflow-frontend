"use client";

import {
  BellRing,
  BookOpenText,
  ChartLine,
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
      icon: <House color="black" size={18} />,
      name: "Inicio",
      path: "/dashboard/main",
    },
    {
      id: 1,
      icon: <Notebook color="black" size={18} />,
      name: "Notas",
      path: "/dashboard/notes",
    },
    {
      id: 2,
      icon: <Package color="black" size={18} />,
      name: "Projectos",
      path: "/dashboard/projects",
    },
    {
      id: 3,
      icon: <ListChecks color="black" size={18} />,
      name: "Tareas",
      path: "/dashboard/tasks",
    },
    {
      id: 4,
      icon: <BellRing color="black" size={18} />,
      name: "Recordatorios",
      path: "/dashboard/reminders",
    },
    {
      id: 6,
      icon: <BookOpenText color="black" size={18} />,
      name: "Learn",
      path: "/dashboard/learn",
    },
  ];

  return (
    <aside className="overflow-hidden fixed top-[4.6rem] h-full sidebar z-[60]">
      <div className=" h-full bg-[#ededed]">
        <nav className="pt-4 px-2 md:px-4">
          {menuItems.map((item) => (
            <SidebarMenuItems key={item.path} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
