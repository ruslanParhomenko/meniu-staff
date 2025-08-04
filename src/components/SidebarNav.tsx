"use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BarChart2, LineChart, List, LogOut, Pause } from "lucide-react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

import React from "react";

// import { postAuthLogout } from "@/api/auth/logout";

// import { QUERY_KEYS } from "@/constants/queryKeys";

import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "./ui/sidebar";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./switches/LanguageSwitch";

const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const queryClient = useQueryClient();

  const t = useTranslations("Navigation");

  // const logoutMutation = useMutation({
  //   mutationFn: postAuthLogout,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [QUERY_KEYS.userData],
  //     });

  //     router.push(`/sign-in`);
  //   },
  // });

  console.log("pathname", pathname);

  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarMenu className="flex h-full flex-col gap-4 pt-10 ">
          {SIDEBAR_NAVIGATION.map((item) => {
            const isActivePath = pathname === item.url;

            console.log("isActivePath", isActivePath);
            return (
              <SidebarMenuButton
                key={item.title}
                isActive={isActivePath}
                asChild
                className={cn("text-blue-600 ", {
                  "bg-blue-600! text-white hover:bg-blue-600 [&>span]:text-white":
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

      <SidebarFooter>
        <SidebarMenu className="flex flex-row justify-between items-center gap-4 px-6">
          <LogOut className=" rotate-180 text-blue-600" />

          <LanguageSwitcher />

          {/* <SidebarMenuButton
            onClick={() => router.push(`/settings/company-info`)}
          >
            <Settings className="h-6! w-6! text-blue-600" />

            <span className="text-base text-[#5F6165]">{t("settings")}</span>
          </SidebarMenuButton> */}
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
