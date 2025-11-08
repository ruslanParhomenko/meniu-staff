"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const GoogleButton = () => {
  const t = useTranslations("Meniu");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/meniu-staff";
  return (
    <>
      <Button
        variant={"default"}
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl,
          });
        }}
        className="flex items-center gap-2 text-center text-3xl font-bold  p-8 px-16 bg-white text-black hover:bg-black/60 hover:text-white hover:shadow-lg hover:shadow-black/20"
      >
        {t("menu")}
      </Button>
    </>
  );
};

export default GoogleButton;
