"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEmployees } from "@/hooks/useEmploees";

import { useAbility } from "@/providers/AbilityProvider";
import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmployeesListTable() {
  const t = useTranslations("Settings");
  const { isAdmin } = useAbility();
  const { employeesQuery, deleteMutation } = useEmployees();

  const employees = employeesQuery.data || [];
  const deleteEmployee = (id: number) => {
    if (!isAdmin) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="w-full px-2 md:w-1/2">
      <h2 className="text-lg font-semibold mt-6">{t("employees")}:</h2>
      {employees.map((emp, idx) => (
        <div key={`${emp.id}-${idx}`} className="flex justify-between py-2">
          <Label className="min-w-1/3">{emp.name}</Label>
          <Label className="text-muted-foreground ">{emp.position}</Label>
          <Label className="text-muted-foreground ">
            {isAdmin ? `${emp.rate}` : "-"}
          </Label>
          <Button type="button" onClick={() => deleteEmployee(emp.id)}>
            <Delete />
          </Button>
        </div>
      ))}
    </div>
  );
}
