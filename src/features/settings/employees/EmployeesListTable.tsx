"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/providers/AbilityProvider";
import { useEmployees } from "@/providers/EmployeeProvider";
import { format, parseISO } from "date-fns";
import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmployeesListTable() {
  const t = useTranslations("Home");
  const { isAdmin } = useAbility();
  const { employees } = useEmployees();

  const deleteEmployee = (id: number) => {
    if (!isAdmin) return;
    // deleteMutation(id);
    console.log(id);
  };

  return (
    <div className="w-full p-4 ">
      {employees.map((emp, idx) => (
        <div key={`${emp.date}-${idx}`} className="flex justify-between py-2">
          <Label className="min-w-1/5">
            {emp.date ? format(parseISO(emp.date), "dd.MM.yy") : "-"}
          </Label>
          <Label className="min-w-1/5">{emp.name}</Label>
          <Label className="text-muted-foreground min-w-1/5 ">
            {emp.position}
          </Label>
          <Label className="min-w-1/4">{emp.vacation}</Label>
          <Label className="text-muted-foreground min-w-1/5 ">
            {isAdmin ? `${emp.rate}` : "-"}
          </Label>
          {/* <Button type="button" onClick={() => deleteEmployee(emp.id)}>
            <Delete />
          </Button> */}
        </div>
      ))}
    </div>
  );
}
