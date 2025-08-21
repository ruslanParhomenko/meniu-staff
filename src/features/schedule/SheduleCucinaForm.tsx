"use client";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSheetData } from "@/hooks/use-schedule-data-google";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScheduleTable } from "./ScheduleTable";
import { selectMonthCucina } from "./constants";

export const ScheduleCucinaForm = () => {
  const t = useTranslations("Navigation");
  const LOKAL_KEY = "lokal-month";

  const selectedMonth = localStorage.getItem(LOKAL_KEY);
  const [dataRange, setDataRange] = useState<string>(selectedMonth || "1");
  const { data } = useSheetData({ range: dataRange as string });

  const form = useForm();

  const handleChange = (value: string) => {
    const selected = selectMonthCucina.find((item) => item.value === value);
    localStorage.setItem(LOKAL_KEY, selected?.value as string);
    if (selected) setDataRange(selected.value);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-full">
          <div className="md:w-1/5 w-full pb-3">
            <Select
              value={
                selectMonthCucina.find((item) => item.label === dataRange)
                  ?.value
              }
              onValueChange={handleChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t("selectMonth")} />
              </SelectTrigger>
              <SelectContent>
                {selectMonthCucina.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {dataRange === "1" ? (
            <div className="flex items-center justify-center w-full h-full">
              data not found
            </div>
          ) : (
            <ScheduleTable data={data} />
          )}
        </form>
      </Form>
    </div>
  );
};
