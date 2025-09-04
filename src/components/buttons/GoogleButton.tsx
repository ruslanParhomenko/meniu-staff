"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import FrameTop from "../meniu/FrameTop";
import FrameBotton from "../meniu/FrameBotton";

const GoogleButton = () => {
  const t = useTranslations("Meniu");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <>
      <FrameTop size={80} />
      <button
        className="rounded-xl  bg-transparent text-center text-3xl font-bold   text-background  shadow-md  px-5"
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
      <FrameBotton size={80} />
    </>
  );
};

export default GoogleButton;
