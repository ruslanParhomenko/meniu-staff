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
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ScheduleForm = () => {
  const [dataRange, setDataRange] = useState<string>("Waiters!D58:AM80");
  const { data, loading } = useSheetData({ range: dataRange as string });

  const form = useForm();

  const selectData = [
    { value: "Waiters!D1:AM22", label: "June 2025" },
    { value: "Waiters!D29:AM50", label: "July 2025" },
    { value: "Waiters!D57:AM78", label: "August 2025" },
    { value: "Waiters!D85:AM107", label: "September 2025" },
    { value: "1", label: "October 2025" },
  ];
  const handleChange = (value: string) => {
    const selected = selectData.find((item) => item.value === value);
    if (selected) setDataRange(selected.value);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-full">
          <div className="md:w-1/5 w-full py-2">
            <Select
              value={selectData.find((item) => item.label === dataRange)?.value}
              onValueChange={handleChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select range" />
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
          {data ? (
            <Table>
              <TableBody>
                {data.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      {row.map((cell, j) => {
                        const isText = j === 4;

                        const isFirstRow =
                          i === 0 || i === 1 || i === data.length - 1;
                        const isFirstThreeColumns = j < 5;

                        let borderClass = "";
                        if (isFirstRow || isFirstThreeColumns) {
                          borderClass = ` ${
                            j === 4
                              ? " text-black text-left"
                              : "text-sm text-center"
                          }  ${j === 3 ? "text-black pl-4" : "text-blue-600"}`;
                        } else if (!isFirstThreeColumns && !isFirstRow) {
                          borderClass = "";
                        }

                        return (
                          <TableCell
                            key={j}
                            className={`
                        ${borderClass} h-9 w-9  
                        ${isText ? "text-blue-600" : ""}
                        ${
                          j === 4
                            ? "min-w-[40px] sticky left-0 z-10 text-left"
                            : "text-center"
                        }
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
          ) : (
            <div>Schedule not found...</div>
          )}
        </form>
      </Form>
    </div>
  );
};
