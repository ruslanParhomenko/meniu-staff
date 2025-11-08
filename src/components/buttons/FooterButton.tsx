import { signOut } from "next-auth/react";
import LanguageSwitcher from "../switches/LanguageSwitch";
import { LogOut, Mail } from "lucide-react";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

export default function FooterButton({
  openAccordion,
  setOpenAccordion,
  nameTag,
}: {
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
  nameTag: string;
}) {
  const isOpen = openAccordion === nameTag;

  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion("feedback");
  };

  return (
    <>
      <OrderListTelegramForm
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <div className="flex flex-row w-full items-center justify-around px-4 pt-5 gap-2 mt-auto sticky bottom-0 ">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="rotate-180 text-white" />
        </button>
        <button className="w-12" type="button" onClick={handleAccordionToggle}>
          <Mail className="mx-auto text-white" />
        </button>
        <LanguageSwitcher />
      </div>
    </>
  );
}
