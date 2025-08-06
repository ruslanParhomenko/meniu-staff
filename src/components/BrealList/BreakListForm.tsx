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
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BREAK_LIST_DEFAULT,
  MINUTES_SELECT,
  NAMES_SELECT,
  TIME_LABELS,
} from "./constant";
import DatePickerInput from "@/features/inputs/DatePickerInput";

export const BreakListForm = () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      size: 12,
      minSize: 12,
      maxSize: 12,
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
          data={NAMES_SELECT}
        />
      ),
    },
    ...TIME_LABELS.map((time) => ({
      accessorKey: time,
      header: time,
      cell: ({ row }: { row: import("@tanstack/react-table").Row<any> }) => {
        return (
          <SelectInput
            fieldName={`rows[${row.index}][hours][${time}]`}
            fieldLabel=""
            data={MINUTES_SELECT}
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
      size: 30,
      minSize: 30,
      maxSize: 30,
    },
  });
  const handleSubmit: SubmitHandler<any> = (data) => {
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
    <div className="w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <DatePickerInput fieldName="date" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead />
                {TIME_LABELS.map((h, i) => (
                  <TableHead key={i} className="text-center">
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
          <div className="flex items-center justify-start space-x-2 pt-6">
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
