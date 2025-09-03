"use client";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";

export const LANGUAGES_LIST = [
  { label: "romanian", lang: "ro" },
  { label: "russian", lang: "ru" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("Home");

  const changeLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE_BAR=${lang}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full focus:outline-none"
        >
          <Image
            src={"/global.png"}
            alt={locale}
            fill
            className="object-cover"
            sizes="28px"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-32 rounded-md bg-white shadow-md dark:bg-gray-800"
      >
        {LANGUAGES_LIST.filter(({ lang }) => lang !== locale).map(
          ({ label, lang }) => (
            <DropdownMenuItem
              key={lang}
              onSelect={() => changeLanguage(lang)}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-[#175CD340] focus:bg-[#347AE2] "
            >
              {t(label)}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
