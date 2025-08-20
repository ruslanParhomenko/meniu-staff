"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import { Form } from "@/components/ui/form";
import { defaultReportCucina, ReportCucinaType } from "./schema";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SendResetButton } from "@/features/ui/SendResetButton";
import { Separator } from "@/components/ui/separator";

export default function DailyReportForm() {
  const form = useForm<ReportCucinaType>({
    defaultValues: defaultReportCucina as ReportCucinaType,
  });

  // field arrays
  const arrays = {
    shifts: useFieldArray({ control: form.control, name: "shifts" }),

    leftoversLeft: useFieldArray({
      control: form.control,
      name: "leftoversLeft",
    }),
    preparedSalads: useFieldArray({
      control: form.control,
      name: "preparedSalads",
    }),
    preparedSeconds: useFieldArray({
      control: form.control,
      name: "preparedSeconds",
    }),
    preparedDesserts: useFieldArray({
      control: form.control,
      name: "preparedDesserts",
    }),
    cuttingLeft: useFieldArray({ control: form.control, name: "cuttingLeft" }),

    staffMeals: useFieldArray({ control: form.control, name: "staffMeals" }),
    movement: useFieldArray({ control: form.control, name: "movement" }),
    writeOff: useFieldArray({ control: form.control, name: "writeOff" }),
  };

  // helper to render arrays
  const renderArray = (
    name: keyof typeof arrays,
    fields: any[],
    placeholders: string[]
  ) => (
    <div className="">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center py-2">
          <div className="grid grid-cols-[50%_20%_20%] gap-4">
            {placeholders.map((ph, i) => (
              <Input
                key={i}
                placeholder={ph}
                {...form.register(
                  `${name}.${index}.${
                    ["name", "rawWeight", "portions", "quantity", "reason"][i]
                  }` as any
                )}
              />
            ))}
          </div>
          <div className="flex-shrink-0 ml-auto basis-[5%]">
            {index === fields.length - 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  arrays[name].append({
                    name: "",
                    rawWeight: "",
                    portions: "",
                    quantity: "",
                    reason: "",
                  } as any)
                }
              >
                +
              </Button>
            ) : (
              <Button
                type="button"
                variant="destructive"
                onClick={() => arrays[name].remove(index)}
              >
                -
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const handleSubmit: SubmitHandler<ReportCucinaType> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className=" w-full md:max-w-[80%] ">
          <DatePickerInput fieldName="date" />

          <Label className="font-semibold pt-6">Смены</Label>
          {renderArray("shifts", arrays.shifts.fields, [
            "Сотрудник",
            "cмена",
            "over",
          ])}
          <Separator className=" bg-black my-4" />
          <Label className="font-semibold pt-6">Остатки</Label>
          {renderArray("leftoversLeft", arrays.leftoversLeft.fields, [
            "Наименование",
            "Кол-во",
          ])}
          <Separator className=" bg-black my-4" />

          <Label className="font-semibold pt-6">Приготовлено</Label>
          <Label>Салаты</Label>
          {renderArray("preparedSalads", arrays.preparedSalads.fields, [
            "Наименование",
            "вес",
            "порции",
          ])}
          <Separator className=" bg-black my-4" />
          <Label>Вторые</Label>
          {renderArray("preparedSeconds", arrays.preparedSeconds.fields, [
            "Наименование",
            "вес",
            "порции",
          ])}
          <Separator className=" bg-black my-4" />
          <Label>Десерты</Label>
          {renderArray("preparedDesserts", arrays.preparedDesserts.fields, [
            "Наименование",
            "вес",
            "порции",
          ])}
          <Separator className=" bg-black my-4" />

          <Label className="font-semibold pt-6">Разделка</Label>

          {renderArray("cuttingLeft", arrays.cuttingLeft.fields, [
            "Наименование",
            "вес",
          ])}
          <Separator className=" bg-black my-4" />

          <Label className="font-semibold pt-6">Питание стаф</Label>
          {renderArray("staffMeals", arrays.staffMeals.fields, [
            "Наименование",
            "вес",
            "порции",
          ])}
          <Separator className=" bg-black my-4" />

          <Label className="font-semibold pt-6">Перемещение</Label>
          {renderArray("movement", arrays.movement.fields, [
            "в ...",
            "... из",
            "кол-во",
          ])}
          <Separator className=" bg-black my-4" />

          <Label className="font-semibold pt-6">Списание</Label>
          {renderArray("writeOff", arrays.writeOff.fields, [
            "Наименование",
            "Кол-во",
            "Причина",
          ])}
          <Separator className=" bg-black my-4" />
          <Label className="font-semibold pt-6">Заметки</Label>
          <Textarea
            placeholder="Введите текст..."
            {...form.register("notes")}
          />
        </div>
        <SendResetButton resetForm={form.reset} />
      </form>
    </Form>
  );
}
