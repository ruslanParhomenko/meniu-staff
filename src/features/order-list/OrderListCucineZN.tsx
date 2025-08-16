"use client";
import SelectInput from "@/components/inputs/SelectInput";
import {
  BAKERY,
  EMPTY,
  FRUITS_CUISINE,
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
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { OrderCardWrapper } from "@/components/wrapper/OrderCardWrapper";
import { Label } from "@/components/ui/label";

export const OrderListCuisine = () => {
  const form = useFormContext();
  const { register } = form;
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <InputWrapper>
        <OrderCardWrapper data={VEGETABLES} name="VEGETABLES" />
        <OrderCardWrapper data={GREEN} name="GREEN" />
        <OrderCardWrapper data={MILK} name="MILK" />
        <OrderCardWrapper data={NUTS} name="NUTS" />
      </InputWrapper>
      <InputWrapper>
        <OrderCardWrapper data={FRUITS_CUISINE} name="FRUITS_CUISINE" />

        <OrderCardWrapper data={SPICES} name="SPICES" />
        <OrderCardWrapper data={BAKERY} name="BAKERY" />
        <OrderCardWrapper data={OTHER} name="OTHER" />
      </InputWrapper>
      <InputWrapper>
        <OrderCardWrapper data={MEAT} name="MEAT" />
        <OrderCardWrapper data={SPICES_2} name="SPICES_2" />
        <div className="flex flex-col w-full justify-center items-center py-2">
          <Label className="py-2  font-bold text-blue-600">EMPTY</Label>
        </div>

        {EMPTY.map((item, index) => {
          return (
            <div key={index} className="flex justify-between gap-2">
              <Input
                className="w-2/4 mb-1"
                {...register(`EMPTY.${index}.name`)}
              />
              <Input
                className="w-1/4 pr-2"
                {...register(`EMPTY.${index}.quantity`)}
              />
            </div>
          );
        })}
      </InputWrapper>
    </div>
  );
};
