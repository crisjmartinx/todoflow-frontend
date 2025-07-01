import React from "react";

import Header from "@/components/ui/header/Header";
import Sidebar from "@/components/ui/sidebar/Sidebar";

interface DashboardLayout {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayout) {
  return (
    <div className="background-glow relative overflow-hidden">
      <Header />
      <div>
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
