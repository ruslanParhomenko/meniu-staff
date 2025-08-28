"use client";
import {
  CHEMICALS,
  FRUITS,
  GROCERIES,
  MISCELLANEOUS,
  OFFICE,
  PHARMACEUTICAL,
} from "./constants";
import { InputWrapper } from "@/components/wrapper/InputWrapper";
import { OrderCardWrapper } from "@/components/wrapper/OrderCardWrapper";
export const OrderListBar = () => {
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <InputWrapper>
        <OrderCardWrapper data={FRUITS} name="FRUITS" />
        <OrderCardWrapper data={GROCERIES} name="GROCERIES" />
        <OrderCardWrapper data={MISCELLANEOUS} name="MISCELLANEOUS" />
      </InputWrapper>
      <InputWrapper>
        <OrderCardWrapper data={PHARMACEUTICAL} name="PHARMACEUTICAL" />
        <OrderCardWrapper data={OFFICE} name="OFFICE" />
        <OrderCardWrapper data={CHEMICALS} name="CHEMICALS" />
      </InputWrapper>
    </div>
  );
};
