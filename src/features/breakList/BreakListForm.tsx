"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Form } from "../../components/ui/form";
import SelectInput from "../../components/inputs/SelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BREAK_LIST_DEFAULT,
  BreakListItem,
  MINUTES_SELECT,
  TIME_LABELS,
} from "./constant";
import { useTranslations } from "next-intl";

import { useEffect, useMemo } from "react";
import { useEmployeeSqlData } from "@/hooks/use-employee-sql";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import toast from "react-hot-toast";
import { useAbility } from "@/providers/AbilityProvider";
import { SendResetButton } from "../ui/SendResetButton";

export type BreakListFormValues = {
  date?: Date;
  rows: BreakListItem[];
};

export const BreakListForm = () => {
  const { isAdmin, isUser, isObserver } = useAbility();

  const LOCAL_STORAGE_KEY = "breakListFormData";
  const t = useTranslations("UI");
  const { employees, loading } = useEmployeeSqlData();

  const selectedEmployees = useMemo(
    () =>
      employees.map((employee) => ({
        label: employee.name,
        value: employee.name,
      })),
    [employees]
  );

  const columns: ColumnDef<BreakListItem>[] = [
    {
      accessorKey: "id",
      size: 14,
      minSize: 14,
      maxSize: 14,
      cell: (info) => (
        <input
          name={`rows[${info.row.index}][id]`}
          value={info.getValue() as string}
          disabled
        />
      ),
    },
    {
      accessorKey: "name",
      size: 160,
      minSize: 160,
      maxSize: 160,
      cell: ({ row }) => (
        <SelectInput
          fieldName={`rows[${row.index}][name]`}
          fieldLabel=""
          data={selectedEmployees}
          disabled={isObserver}
        />
      ),
    },
    ...TIME_LABELS.map((time) => ({
      accessorKey: time,
      header: time,
      cell: ({
        row,
      }: {
        row: import("@tanstack/react-table").Row<BreakListItem>;
      }) => {
        return (
          <SelectInput
            fieldName={`rows[${row.index}][hours][${time}]`}
            fieldLabel=""
            data={MINUTES_SELECT}
            disabled={isObserver}
          />
        );
      },
    })),
  ];

  const table = useReactTable({
    data: BREAK_LIST_DEFAULT,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 40,
      minSize: 40,
      maxSize: 40,
    },
  });
  const handleSubmit: SubmitHandler<BreakListFormValues> = async (data) => {
    if (!data.date) {
      toast.error("Дата не выбрана");
      return;
    }
    try {
      await fetch("/api/breakList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: data.date,
          rows: data.rows,
        }),
      });
      toast.success("Брейк-лист успешно сохранён !");
    } catch (e) {
      toast.error("Ошибка при сохранении брейк-листа");
    }
  };
  const savedData =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY)
      : null;

  const parsedSavedData = savedData ? JSON.parse(savedData) : null;

  const form = useForm<BreakListFormValues>({
    defaultValues: parsedSavedData || {
      rows: BREAK_LIST_DEFAULT.map((item) => ({
        id: item.id,
        name: item.name,
        hours: Object.assign({}, ...item.hours),
      })),
    },
  });
  const watchAllFields = form.watch();
  useEffect(() => {
    if (!watchAllFields) return;

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchAllFields));
    } catch (error) {}
  }, [watchAllFields]);

  const resetForm = () => {
    form.reset({
      date: new Date(),
      rows: BREAK_LIST_DEFAULT.map((item) => ({
        id: item.id,
        name: item.name,
        hours: Object.assign({}, ...item.hours),
      })),
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <DatePickerInput fieldName="date" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead />
                {TIME_LABELS.map((h, i) => (
                  <TableHead
                    key={i}
                    className="text-center text-blue-600 font-bold text-xl"
                  >
                    {h}:
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={
                            index === 1
                              ? "sticky left-0 z-10 bg-white md:static"
                              : ""
                          }
                        >
                          <div style={{ width: cell.column.getSize() }}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <SendResetButton resetForm={resetForm} />
        </form>
      </Form>
    </div>
  );
};
