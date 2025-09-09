"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import FrameTop from "../meniu/FrameTop";
import FrameBotton from "../meniu/FrameBotton";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";

const GoogleButton = () => {
  const t = useTranslations("Meniu");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <>
      <FrameTop size={150} />
      <Button
        variant={"default"}
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl,
          });
        }}
        className="flex items-center gap-2 text-center text-4xl font-bold text-background p-8 px-12 rounded-full"
      >
        {t("menu")}
      </Button>
      <FrameBotton size={150} />
    </>
  );
};

export default GoogleButton;
