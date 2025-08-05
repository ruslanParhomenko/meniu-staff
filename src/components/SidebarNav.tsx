"use client";
import { BarChart2, LineChart, List, LogOut, Pause } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { signOut } from "next-auth/react";

import React from "react";

import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
} from "./ui/sidebar";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./switches/LanguageSwitch";

const SidebarNav = () => {
  const pathname = usePathname();

  const t = useTranslations("Navigation");

  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarMenu className="flex h-full flex-col gap-4 pt-10 ">
          {SIDEBAR_NAVIGATION.map((item) => {
            const isActivePath = pathname === item.url;

            return (
              <SidebarMenuButton
                key={item.title}
                isActive={isActivePath}
                asChild
                className={cn("text-blue-600 ", {
                  "bg-blue-300! text-black hover:bg-blue-600 [&>span]:text-black":
                    isActivePath,
                })}
              >
                <Link href={item.url}>
                  <span className="text-base">{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-20 ">
        <SidebarMenu className="flex flex-row justify-between items-center gap-4 px-6">
          <div
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className=" rotate-180 text-blue-600" />
          </div>

          <LanguageSwitcher />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;

export const SIDEBAR_NAVIGATION = [
  {
    title: "schedule",
    url: "/schedule",
    icon: LineChart,
  },
  {
    title: "report",
    url: "/report",
    icon: BarChart2,
  },
  {
    title: "breakList",
    url: "/breakList",
    icon: Pause,
  },
  {
    title: "ordersList",
    url: "/ordersList",
    icon: List,
  },
];
