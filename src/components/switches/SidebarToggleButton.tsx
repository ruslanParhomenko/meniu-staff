"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

export function SidebarToggleButton() {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 md:hidden text-blue-600 hover:bg-gray-100 rounded"
      aria-label="Toggle Sidebar"
    >
      <Menu />
    </button>
  );
}
