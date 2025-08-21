"use client";

import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useSheetData } from "@/hooks/use-schedule-data-google";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const ScheduleCucinaForm = () => {
  const t = useTranslations("Navigation");
  const [dataRange, setDataRange] = useState<string>("Cooks!C37:AL49");
  const { data } = useSheetData({ range: dataRange as string });
  const todayDay = new Date().getDate();

  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const form = useForm();

  const selectData = [
    { value: "Cooks!C1:AL13", label: "June 2025" },
    { value: "Cooks!C19:AL31", label: "July 2025" },
    { value: "Cooks!C37:AL49", label: "August 2025" },
    { value: "Cooks!C55:AL67", label: "September 2025" },
    { value: "1", label: "October 2025" },
  ];
  const handleChange = (value: string) => {
    const selected = selectData.find((item) => item.value === value);
    if (selected) setDataRange(selected.value);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const firstRow = data[0];
      const index = firstRow.findIndex(
        (cell) => String(cell) === String(todayDay)
      );
      if (index !== -1) {
        setSelectedColumn(index);
      }
    }
  }, [data, todayDay]);

  if (dataRange === "1")
    return (
      <div className="flex items-center justify-center w-full h-full">
        data not found
      </div>
    );

  return (
    <div className="w-full overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-full">
          <div className="md:w-1/5 w-full pb-3">
            <Select
              value={selectData.find((item) => item.label === dataRange)?.value}
              onValueChange={handleChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t("selectMonth")} />
              </SelectTrigger>
              <SelectContent>
                {selectData.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableBody>
              {data.map((row, i) => {
                const hasValueInSelected =
                  selectedColumn !== null && row[selectedColumn];
                const noBorderRow = !row[3];

                return (
                  <TableRow key={i}>
                    {row.map((cell, j) => {
                      const isText = j === 4 || j === 2;
                      const isFirstRow =
                        i === 0 || i === 1 || i === data.length - 1;
                      const isFirstThreeColumns = j < 5;

                      let borderClass = "";
                      if (isFirstRow || isFirstThreeColumns) {
                        borderClass = ` ${
                          j === 4
                            ? "min-w-[30px] sticky left-0 z-10 text-left bg-white/80"
                            : "text-sm text-center"
                        }  ${j === 3 ? "text-black pl-4" : "text-blue-600"}`;
                      }

                      const isHighlighted = selectedColumn === j;

                      const shouldEmphasize =
                        isText && hasValueInSelected && i !== 0;

                      return (
                        <TableCell
                          key={j}
                          onClick={() => {
                            if (i === 0) {
                              setSelectedColumn((prev) =>
                                prev === j ? null : j
                              );
                            }
                          }}
                          className={` h-0!${
                            noBorderRow ? "" : "border border-gray-200 "
                          }
                      ${borderClass} h-9 w-9
                      ${isText ? "text-blue-600" : ""}
                      ${
                        j === 4
                          ? "min-w-[40px] sticky left-0 z-10 text-left"
                          : "text-center"
                      }
                      ${
                        isHighlighted
                          ? "bg-gray-300 font-bold text-red-600"
                          : ""
                      }
                      ${i === 0 ? "cursor-pointer" : ""}
                      ${shouldEmphasize ? "font-bold text-red-600" : ""}
                    `}
                        >
                          {cell}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
};
