"use client";
import { LogOut } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
} from "../../components/ui/sidebar";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "../../components/switches/LanguageSwitch";
import { SidebarToggleButton } from "../../components/switches/SidebarToggleButton";
import { SIDEBAR_NAVIGATION } from "./constants";

const SidebarNav = () => {
  const pathname = usePathname();

  const t = useTranslations("Navigation");
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center p-4 lg:hidden">
        <SidebarToggleButton />
      </div>
      <Sidebar className="border-none">
        <SidebarContent>
          <span className="text-xs pt-4 pl-2">
            {session?.user?.email?.split("@")[0] || "BAR"}
          </span>
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
    </>
  );
};

export default SidebarNav;
