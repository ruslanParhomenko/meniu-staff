"use client";
import SelectInput from "@/components/inputs/SelectInput";
import {
  BAKERY,
  EMPTY,
  FRUITS_CUCINE,
  GREEN,
  MEAT,
  MILK,
  NUTS,
  OTHER,
  QUANTITY_SELECT,
  SPICES,
  SPICES_2,
  VEGETABLES,
} from "./constants";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const OrderListCucine = () => {
  const form = useFormContext();
  const { register } = form;
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <div className="flex flex-col w-60 mx-5">
        {VEGETABLES.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {VEGETABLES.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {GREEN.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {GREEN.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {MILK.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {MILK.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {NUTS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {NUTS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
      </div>
      <div className="flex flex-col w-60 mx-5">
        {FRUITS_CUCINE.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FRUITS_CUCINE.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />

        {SPICES.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {SPICES.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {BAKERY.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BAKERY.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {OTHER.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {OTHER.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
      </div>
      <div className="flex flex-col w-60 mx-5">
        {MEAT.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {MEAT.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {SPICES_2.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {SPICES_2.length - 1 !== index && <Separator className="my-1" />}
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
