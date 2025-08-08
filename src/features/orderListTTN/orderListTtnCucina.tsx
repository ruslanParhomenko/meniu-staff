import SelectInput from "@/components/inputs/SelectInput";
import {
  ROGOB,
  BLUESHARK,
  FRUITBOX_C,
  DINOVA,
  FORWARD,
  IUG,
  PRESTAPAC,
  IMCOMVIL,
  ARTACULINAR,
  ETALONUS,
  VITAFOR,
  FORWARD_CUCINE,
  DELPHI,
} from "./constants";
import { QUANTITY_SELECT } from "../orderListTTN/constants";
import { Separator } from "@/components/ui/separator";

export const OrderListTTNCucine = () => {
  return (
    <div className="flex flex-row gap-10 w-full justify-start mx-5">
      <div className="flex flex-col w-60 mx-5">
        {ROGOB.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {ROGOB.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {BLUESHARK.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BLUESHARK.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />

        {VITAFOR.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {VITAFOR.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
      </div>
      <div className="flex flex-col w-60 mx-5">
        {ARTACULINAR.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {ARTACULINAR.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {PRESTAPAC.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FORWARD.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />

        {IMCOMVIL.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {IMCOMVIL.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />

        {ETALONUS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {ETALONUS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {FORWARD_CUCINE.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FORWARD_CUCINE.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {DELPHI.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {DELPHI.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
      </div>
      <div className="flex flex-col w-60 mx-5">
        {DINOVA.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {DINOVA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {IUG.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {IUG.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
        {FRUITBOX_C.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FRUITBOX_C.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-2" />
      </div>
    </div>
  );
};
