import SelectInput from "@/components/inputs/SelectInput";
import {
  FRUITS,
  GROCERIES,
  HIMICALS,
  MISCELLANEOUS,
  OFFICE,
  PHARMACEUTICAL,
} from "./constants";
import { QUANTITY_SELECT } from "../orderListTTN/constants";
import { Separator } from "@/components/ui/separator";

export const OrderListBar = () => {
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <div className="flex flex-col w-80 mx-5">
        {FRUITS.map((item, index) => {
          return (
            <div key={index} className="w-80 ">
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
            <div key={index} className="w-80 ">
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
            <div key={index} className="w-80 ">
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
      <div className="flex flex-col w-80 mx-5">
        {PHARMACEUTICAL.map((item, index) => {
          return (
            <div key={index} className="w-80 ">
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
            <div key={index} className="w-80 ">
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
            <div key={index} className="w-80 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {HIMICALS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
