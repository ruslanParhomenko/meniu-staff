"use client";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddEmployeeForm } from "./Employees/AddEmployeeForm";
import { EmployeesListTable } from "./Employees/EmployeesListTable";

export default function SettingsForm() {
  const t = useTranslations("Settings");
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg cursor-pointer w-full [&>svg]:hidden bg-blue-400 px-4 py-2 hover:bg-blue-600  no-underline! focus:no-underline">
            {t("addEmployees")} +
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2">
              <AddEmployeeForm />
              <EmployeesListTable />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
