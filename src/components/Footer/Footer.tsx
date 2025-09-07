"use client";
import { signOut } from "next-auth/react";
import LanguageSwitcher from "../switches/LanguageSwitch";
import { LogOut, Mail, Send } from "lucide-react";
import { useState } from "react";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

export default function Footer() {
  const [isOpen, setOpenAccordion] = useState("");
  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion("feedback");
  };
  return (
    <>
      <OrderListTelegramForm
        openAccordion={isOpen}
        setOpenAccordion={setOpenAccordion}
      />
      <div className="flex flex-row w-full items-center justify-around px-4 pt-5 gap-2 mt-auto">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="rotate-180 text-foreground" />
        </button>

        {/* <button type="submit" className="px-4 py-2  rounded" form="menuForm">
        Send
      </button> */}
        <button className="w-12" type="button" onClick={handleAccordionToggle}>
          <Mail className="mx-auto text-foreground" />
        </button>

        <LanguageSwitcher />
      </div>
    </>
  );
}
