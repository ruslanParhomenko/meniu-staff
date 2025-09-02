"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

const GoogleButton = () => {
  const t = useTranslations("Meniu");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <button
      className="rounded-3xl border border-solid border-transparent bg-white text-center text-3xl font-bold   flex items-center justify-center text-background gap-4 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150 px-5 mt-10"
      onClick={() => {
        signIn("google", {
          callbackUrl: callbackUrl,
        });
      }}
    >
      <h1 className="flex items-center gap-2 text-center text-3xl font-bold text-black p-4">
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
    </button>
  );
};

export default GoogleButton;
