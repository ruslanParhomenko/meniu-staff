"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAbility } from "@/providers/AbilityProvider";

export function UserListTable() {
  const t = useTranslations("Home");
  const { query } = useAbility();

  return (
    <div className="w-full p-4 ">
      {query &&
        query?.map((emp, idx: number) => (
          <div key={`${emp.id}-${idx}`} className="flex justify-between py-2">
            <Label className="min-w-1/4">{emp.id}</Label>
            <Label className="min-w-1/4">{emp.mail}</Label>
            <Label className="text-muted-foreground min-w-1/4">
              {emp.role}
            </Label>
            <Label className="min-w-1/4">
              {emp.isActive ? "activ" : "non-activ"}
            </Label>
          </div>
        ))}
    </div>
  );
}
