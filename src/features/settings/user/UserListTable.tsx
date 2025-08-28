"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserType } from "./schema";
import { useApi } from "@/hooks/use-query";

export function UserListTable() {
  const t = useTranslations("Home");
  const { query, deleteMutation } = useApi<UserType>({
    endpoint: "user",
    queryKey: "users",
  });

  const user = query.data;

  return (
    <div className="w-full px-2 md:w-1/2">
      <h2 className="text-lg font-semibold mt-6">{t("employees")}:</h2>
      {user?.map((emp, idx: number) => (
        <div key={`${emp.id}-${idx}`} className="flex justify-between py-2">
          <Label className="min-w-1/3">{emp.mail}</Label>
          <Label className="text-muted-foreground ">{emp.role}</Label>
          <Button
            type="button"
            onClick={() => deleteMutation.mutate(Number(emp.id))}
          >
            <Delete />
          </Button>
        </div>
      ))}
    </div>
  );
}
