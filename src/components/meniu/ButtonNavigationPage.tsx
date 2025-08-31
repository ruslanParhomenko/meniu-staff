"use client";

import { useRouter } from "@/i18n/navigation";
import { usePathname } from "next/navigation";

export default function ButtonNavigationPage({
  leftPage,
  rightPage,
}: {
  leftPage: string;
  rightPage: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getTextPrev = () => {
    switch (pathname) {
      case `/meniu-vip/bar`:
        return "← home";
      case `/meniu-vip/bar-page-2`:
        return "← prev";
      case `/meniu-vip/cusine`:
        return "← home";
      case `/meniu-vip/daily-meniu`:
        return "← home";
      default:
        return null;
    }
  };
  const getTextNext = () => {
    switch (pathname) {
      case `/meniu-vip/bar`:
        return "next →";
      case `/meniu-vip/bar-page-2`:
        return "home →";
      case `/meniu-vip/cusine`:
        return null;
      default:
        return null;
    }
  };
  return (
    <div className=" flex items-center justify-center pt-8">
      <button
        onClick={() => router.replace(leftPage)}
        className="text-xs absolute  left-12"
      >
        {getTextPrev()}
      </button>
      <button
        onClick={() => router.replace(rightPage)}
        className="text-xs absolute  right-12"
      >
        {getTextNext()}
      </button>
    </div>
  );
}
