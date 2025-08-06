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
import { Form } from "../ui/form";
import SelectInput from "../selector/SelectInput";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  BREAK_LIST_DEFAULT,
  BreakListItem,
  MINUTES_SELECT,
  NAMES_SELECT,
  TIME_LABELS,
} from "./constant";
import DatePickerInput from "@/features/inputs/DatePickerInput";
import { useTranslations } from "next-intl";

type BreakListFormValues = {
  date?: Date;
  rows: BreakListItem[];
};

export const BreakListForm = () => {
  const t = useTranslations("UI");

  const isBoulean = (index: number, time: string) => {
    const fieldName = `rows[${index}][hours][${time}]`;
    const selectedValue = useWatch({ name: fieldName });
    return selectedValue === "X";
  };
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
      size: 150,
      minSize: 150,
      maxSize: 150,
      cell: ({ row }) => (
        <SelectInput
          fieldName={`rows[${row.index}][name]`}
          fieldLabel=""
          data={NAMES_SELECT}
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
            disabled={isBoulean(row.index, time)}
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
      size: 38,
      minSize: 38,
      maxSize: 38,
    },
  });
  const handleSubmit: SubmitHandler<BreakListFormValues> = (data) => {
    console.log("submit", data);
  };

  const form = useForm({
    defaultValues: {
      rows: BREAK_LIST_DEFAULT.map((item) => ({
        id: item.id,
        name: item.name,
        hours: Object.assign({}, ...item.hours),
      })),
    },
  });

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
                    className="text-center text-blue-600 font-bold"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
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
          <div className="flex justify-start items-center p-5 pt-20">
            <Button type="submit" variant={"default"}>
              {t("save")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
