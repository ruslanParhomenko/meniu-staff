import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Meniu");
  return (
    <header className="flex items-center justify-center pt-8 pb-4">
      <h1 className="flex items-center gap-2 text-center text-3xl font-bold  ">
        <Image
          className=" -rotate-90"
          src="/meniu.svg"
          alt="logo"
          width={20}
          height={20}
          priority
        />
        {t("menu")}
        <Image
          className=" rotate-90"
          src="/meniu.svg"
          alt="logo"
          width={20}
          height={20}
          priority
        />
      </h1>
    </header>
  );
}
