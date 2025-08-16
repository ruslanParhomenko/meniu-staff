"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";
import { tobaccoDefault, TobaccoSchemaType } from "./schema";
import SelectField from "@/components/inputs/SelectField";
import { SELECT_COUNT } from "./constants";
import { useFormContext, useWatch } from "react-hook-form";
import DatePickerInput from "@/components/inputs/DatePickerInput";

export default function TableTobacco() {
  const { control } = useFormContext();
  const tobacco =
    (useWatch({ name: "tobacco", control }) as TobaccoSchemaType) ||
    tobaccoDefault;

  return (
    <div className="w-full">
      <Label className="text-lg font-semibold pb-7">Tobacco</Label>
      <Table className="w-full [&_th]:text-center [&_td]:text-center">
        <TableHeader>
          <TableRow className="h-10">
            <TableHead className="w-40"></TableHead>
            <TableHead className="w-30">Stock</TableHead>
            <TableHead className="w-20">+</TableHead>
            <TableHead className="w-20">-</TableHead>
            <TableHead className="w-30">Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tobacco?.map((item, idx) => (
            <TableRow key={idx} className="h-10">
              <TableCell className="px-2">{item.name}</TableCell>
              <TableCell className="px-2">{item.stock}</TableCell>
              <TableCell className="px-2">
                <SelectField
                  fieldName={`tobacco.${idx}.incoming`}
                  data={SELECT_COUNT}
                />
              </TableCell>
              <TableCell className="px-2">
                <SelectField
                  fieldName={`tobacco.${idx}.outgoing`}
                  data={SELECT_COUNT}
                />
              </TableCell>
              <TableCell className="px-2">
                {(
                  Number(item.stock || 0) +
                  Number(item.incoming ?? 0) -
                  Number(item.outgoing ?? 0)
                ).toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
