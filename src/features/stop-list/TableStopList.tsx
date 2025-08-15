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
import { SubmitHandler, useForm } from "react-hook-form";

export default function TableStopList() {
  const form = useForm();

  const handleSubmit: SubmitHandler<any> = (data) => {
    console.log("data", data);
  };
  return (
    <div className="w-full md:w-1/6 px-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <Label className="text-lg font-semibold  pb-7">Stop List</Label>

          <Table className="[&_th]:text-center [&_td]:text-center">
            <TableHeader>
              <TableRow className="h-10"></TableRow>
            </TableHeader>
            <TableBody>
              {new Array(12).fill("")?.map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <SelectField
                      data={PRODUCTS}
                      fieldName={`stopList.${idx}.products`}
                    />
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
