"use client";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/providers/AbilityProvider";
import { useEmployees } from "@/providers/EmployeeProvider";
import { format, parseISO } from "date-fns";

export function EmployeesListTable() {
  const { isAdmin } = useAbility();
  const { employees } = useEmployees();

  return (
    <div className="w-full p-1 py-4 ">
      {employees.map((emp, idx) => (
        <div key={`${emp.date}-${idx}`} className="flex justify-between py-2">
          <Label className="min-w-2/10">
            {emp.date ? format(parseISO(emp.date), "dd.MM.yy") : "-"}
          </Label>
          <Label className="min-w-4/10">{emp.name}</Label>
          <Label className="text-muted-foreground min-w-2/10 ">
            {emp.position}
          </Label>
          <Label className="min-w-1/10">{emp.date ? emp.vacation : "-"}</Label>
          <Label className="text-muted-foreground min-w-2/10 ">
            {isAdmin ? `${emp.rate}` : "-"}
          </Label>
        </div>
      ))}
    </div>
  );
}
