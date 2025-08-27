"use client";

import { useTranslations } from "next-intl";

export function UserListTable() {
  const t = useTranslations("Settings");

  return (
    <div className="w-full px-2 md:w-1/2">
      <h2 className="text-lg font-semibold mt-6">{t("employees")}:</h2>
    </div>
  );
}
