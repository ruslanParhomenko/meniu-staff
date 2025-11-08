"use client";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE_BAR=${lang}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    router.refresh();
  };

  const nextLang = locale === "ro" ? "ru" : "ro";

  return (
    <button
      type="button"
      onClick={() => changeLanguage(nextLang)}
      className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full focus:outline-none"
    >
      <Globe className="text-white" />
    </button>
  );
}
