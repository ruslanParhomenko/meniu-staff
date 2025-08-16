"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-dropdown-menu";
import SelectField from "@/components/inputs/SelectField";

import { PRODUCTS } from "../report/constants";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { useEffect } from "react";

type StopListItem = {
  products?: string;
  date?: string;
};

export default function TableStopList() {
  const KEY_LOCAL = "stop-list";
  const { getValue, setValue: setLocalValue } = useLocalStorageForm(KEY_LOCAL);

  const savedStopList = getValue();
  const defaultStopList: StopListItem[] = Array.isArray(savedStopList)
    ? (savedStopList as StopListItem[])
    : Array.from({ length: 12 }, () => ({ products: "", date: "" }));

  const form = useForm<{ stopList: StopListItem[] }>({
    defaultValues: {
      stopList: defaultStopList,
    },
  });

  const stopListValues = useWatch({
    control: form.control,
    name: "stopList",
  }) as StopListItem[];

  useEffect(() => {
    if (stopListValues) setLocalValue(stopListValues);
  }, [stopListValues, setLocalValue]);

  useEffect(() => {
    stopListValues.forEach((item, idx) => {
      if (item && item.products && !item.date) {
        form.setValue(`stopList.${idx}.date`, new Date().toLocaleString());
      }
    });
  }, [stopListValues, form]);

  const clearSelect = (index: number) => {
    form.setValue(`stopList.${index}`, { products: "", date: "" });
  };

  return (
    <div className="w-full md:w-2/4 px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-2">
          <Label className="text-lg font-semibold pb-7">Stop List</Label>

          <Table className="[&_th]:text-center [&_td]:text-center">
            <TableHeader>
              <TableRow className="h-10">
                <TableCell>Product</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stopListValues?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <SelectField
                      data={PRODUCTS}
                      fieldName={`stopList.${idx}.products`}
                    />
                  </TableCell>
                  <TableCell>
                    {item.products && <Label>{item.date}</Label>}
                  </TableCell>
                  <TableCell>
                    {item.products && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => clearSelect(idx)}
                      >
                        <Delete />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
}
