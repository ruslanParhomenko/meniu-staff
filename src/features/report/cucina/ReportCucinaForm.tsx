"use client";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import { Form } from "@/components/ui/form";
import { defaultReportCucina, ReportCucinaType } from "./schema";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SendResetButton } from "@/features/ui/SendResetButton";

import { useEmployeeSqlData } from "@/hooks/use-employee-sql";
import { useMemo } from "react";

import { CUCINA_EMPLOYEES, OVER_HOURS, SELECT_TIME } from "./constants";
import { RenderEmloyeesTable } from "./renderEmloyeesTable";

export default function DailyReportForm() {
  const { employees } = useEmployeeSqlData();

  const selectedEmployees = useMemo(
    () =>
      employees
        .filter((emp) => CUCINA_EMPLOYEES.includes(emp.position))
        .map((emp) => emp.name),
    [employees]
  );

  const form = useForm<ReportCucinaType>({
    defaultValues: defaultReportCucina as ReportCucinaType,
  });

  const handleSubmit: SubmitHandler<ReportCucinaType> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="w-full md:max-w-[700px] mx-auto">
          <DatePickerInput fieldName="date" />

          <Label className="font-semibold py-4">Смены</Label>

          <RenderEmloyeesTable
            form={form}
            employeesArray={selectedEmployees}
            timeArray={SELECT_TIME}
            overArray={OVER_HOURS}
          />

          <Label className="font-semibold pt-6">Остатки</Label>
          {/* {renderArray("leftoversLeft", arrays.leftoversLeft.fields, [
            "Наименование",
            "Кол-во",
          ])} */}

          <Label className="font-semibold pt-6">Приготовлено</Label>
          <Label>Салаты</Label>
          {/* {renderArray("preparedSalads", arrays.preparedSalads.fields, [
            "Наименование",
            "вес",
            "порции",
          ])} */}

          <Label>Вторые</Label>
          {/* {renderArray("preparedSeconds", arrays.preparedSeconds.fields, [
            "Наименование",
            "вес",
            "порции",
          ])} */}

          <Label>Десерты</Label>
          {/* {renderArray("preparedDesserts", arrays.preparedDesserts.fields, [
            "Наименование",
            "вес",
            "порции",
          ])} */}

          <Label className="font-semibold pt-6">Разделка</Label>

          {/* {renderArray("cuttingLeft", arrays.cuttingLeft.fields, [
            "Наименование",
            "вес",
          ])} */}

          <Label className="font-semibold pt-6">Питание стаф</Label>
          {/* {renderArray("staffMeals", arrays.staffMeals.fields, [
            "Наименование",
            "вес",
            "порции",
          ])} */}

          <Label className="font-semibold pt-6">Перемещение</Label>
          {/* {renderArray("movement", arrays.movement.fields, [
            "в ...",
            "... из",
            "кол-во",
          ])} */}

          <Label className="font-semibold pt-6">Списание</Label>
          {/* {renderArray("writeOff", arrays.writeOff.fields, [
            "Наименование",
            "Кол-во",
            "Причина",
          ])} */}

          <Label className="font-semibold pt-6">Заметки</Label>
          <Textarea
            placeholder="Введите текст..."
            {...form.register("notes")}
          />
          <SendResetButton resetForm={form.reset} />
        </div>
      </form>
    </Form>
  );
}
