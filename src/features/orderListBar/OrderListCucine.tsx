import SelectInput from "@/components/inputs/SelectInput";
import {
  BAKERY,
  FRUITS,
  FRUITS_CUCINE,
  GREEN,
  GROCERIES,
  HIMICALS,
  MEAT,
  MILK,
  MISCELLANEOUS,
  NUTS,
  OFFICE,
  OTHER,
  PHARMACEUTICAL,
  SPICES,
  SPICES_2,
  VEGETABLES,
} from "./constants";
import { QUANTITY_SELECT } from "../orderListTTN/constants";
import { Separator } from "@/components/ui/separator";

export const OrderListCucine = () => {
  return (
    <div className="flex flex-row  w-full justify-start mx-2">
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
      </div>
      <div className="flex flex-col w-60 mx-5">
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
      </div>
      <div className="flex flex-col w-60 mx-5">
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
      </div>
      <div className="flex flex-col w-60 mx-5">
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
      </div>
      <div className="flex flex-col w-60 mx-5">
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
    </div>
  );
};
