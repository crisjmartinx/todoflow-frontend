import React from "react";

import Header from "@/components/main/header/Header";
import Sidebar from "@/components/main/sidebar/Sidebar";

interface DashboardLayout {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayout) {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
