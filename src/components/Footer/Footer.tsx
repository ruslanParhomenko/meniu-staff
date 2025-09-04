import { signOut } from "next-auth/react";
import LanguageSwitcher from "../switches/LanguageSwitch";
import { LogOut } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-row w-full items-center justify-around px-4 pt-10  gap-2 mt-auto">
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

      <LanguageSwitcher />
    </div>
  );
}
