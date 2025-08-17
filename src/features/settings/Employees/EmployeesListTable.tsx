"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEmployeeSqlData } from "@/hooks/use-employee-sql";
import { Delete } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmployeesListTable() {
  const t = useTranslations("Settings");
  const { employees, loading, deleteEmployee } = useEmployeeSqlData();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="w-full md:w-1/4">
      <h2 className="text-lg font-semibold mt-6">{t("employees")}:</h2>
      {employees.map((emp) => (
        <div key={emp.id} className="flex justify-between py-2">
          <Label className="min-w-1/3">{emp.name}</Label>
          <Label className="text-muted-foreground ">{emp.position}</Label>
          <Button type="button" onClick={() => deleteEmployee(emp.id)}>
            <Delete />
          </Button>
        </div>
      ))}
    </div>
  );
}
