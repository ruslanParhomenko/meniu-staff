"use client";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddEmployeeForm } from "./employees/AddEmployeeForm";
import { EmployeesListTable } from "./employees/EmployeesListTable";
import { AddUserForm } from "./user/AddUserForm";
import { UserListTable } from "./user/UserListTable";

export default function SettingsForm() {
  const t = useTranslations("Home");
  return (
    <div className="flex flex-col gap-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="employees">
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
      <Accordion type="single" collapsible>
        <AccordionItem value="users">
          <AccordionTrigger className="text-lg cursor-pointer w-full [&>svg]:hidden bg-blue-400 px-4 py-2 hover:bg-blue-600  no-underline! focus:no-underline">
            {t("addUsers")} +
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2">
              <AddUserForm />
              <UserListTable />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
