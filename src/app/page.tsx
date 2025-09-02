"use client";
import AuthRedirect from "@/providers/AuthRedirect";
import GoogleButton from "@/components/buttons/GoogleButton";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Header from "@/components/meniu/Header";

export default function Home() {
  const t = useTranslations("Meniu");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 400);
  }, []);
  return (
    <AuthRedirect>
      <div
        className={`transform transition-all duration-700 
                flex flex-col justify-between  items-center   pt-80 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
      >
        <GoogleButton />
      </div>
    </AuthRedirect>
  );
}
