"use client";
import { signOut } from "next-auth/react";
import LanguageSwitcher from "../switches/LanguageSwitch";
import { LogOut, Mail, Settings } from "lucide-react";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";
import { useRouter } from "@/i18n/navigation";
import { useAbility } from "@/providers/AbilityProvider";

export default function FooterButton({
  openAccordion,
  setOpenAccordion,
  nameTag,
}: {
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
  nameTag: string;
}) {
  const { isAdmin } = useAbility();
  const router = useRouter();
  const isOpen = openAccordion === nameTag;

  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion("feedback");
  };

  const replaceRootPage = () => {
    isAdmin && router.replace("/admin");
  };
  return (
    <>
      <OrderListTelegramForm
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <div className="flex flex-row w-full items-center justify-around px-4 pt-5 gap-2 mt-auto sticky bottom-0 bg-background/60">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="rotate-180 text-foreground" />
        </button>
        {/* <button className="w-12" type="button" onClick={replaceRootPage}>
          <Settings className="mx-auto text-foreground" />
        </button> */}
        <button className="w-12" type="button" onClick={handleAccordionToggle}>
          <Mail className="mx-auto text-foreground" />
        </button>
        <LanguageSwitcher />
      </div>
    </>
  );
}
