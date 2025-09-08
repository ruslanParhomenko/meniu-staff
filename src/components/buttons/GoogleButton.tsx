"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import FrameTop from "../meniu/FrameTop";
import FrameBotton from "../meniu/FrameBotton";
import { Dot } from "lucide-react";

const GoogleButton = () => {
  const t = useTranslations("Meniu");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <>
      <FrameTop size={150} />
      <button
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl,
          });
        }}
      >
        <h1 className="flex items-center gap-2 text-center text-6xl font-bold text-foreground">
          <Dot className="h-10 w-10" />
          {t("menu")}
          <Dot className="h-10 w-10" />
        </h1>
      </button>
      <FrameBotton size={150} />
    </>
  );
};

export default GoogleButton;
