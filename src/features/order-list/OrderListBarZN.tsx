"use client";
import SelectInput from "@/components/inputs/SelectInput";
import {
  EMPTY,
  FRUITS,
  GROCERIES,
  HIMICALS,
  MISCELLANEOUS,
  OFFICE,
  PHARMACEUTICAL,
  QUANTITY_SELECT,
} from "./constants";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const OrderListBar = () => {
  const form = useFormContext();
  const { register } = form;
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <div className="flex flex-col w-60 mx-5">
        {FRUITS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FRUITS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {GROCERIES.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {GROCERIES.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {MISCELLANEOUS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {MISCELLANEOUS.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-60 mx-5">
        {PHARMACEUTICAL.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {PHARMACEUTICAL.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {OFFICE.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {OFFICE.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {HIMICALS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {HIMICALS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {EMPTY.map((item, index) => {
          return (
            <div
              key={index}
              className="w-60 flex flex-row justify-center gap-6"
            >
              <Input
                className="w-3/4 mb-1"
                {...register(`EMPTY.${index}.name`)}
              />
              <Input
                className="w-1/4"
                {...register(`EMPTY.${index}.quantity`)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
