import SelectInput from "@/components/inputs/SelectInput";
import {
  AQUATRADE,
  BUCURIA,
  BUISNESS,
  UBFB,
  COCACOLA,
  FORWARD,
  GLOBARSPIRIT,
  ACVILIN,
  ACVAMONT,
  VERGNANO,
  CHOCO,
  FRUITBOX,
  APIFERA,
  DAVIDAN,
} from "./constants";
import { QUANTITY_SELECT } from "../orderListTTN/constants";
import { Separator } from "@/components/ui/separator";

export const OrderListTTNBar = () => {
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <div className="flex flex-col w-70 mx-5">
        {AQUATRADE.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {AQUATRADE.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {BUCURIA.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BUCURIA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {VERGNANO.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {VERGNANO.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {FRUITBOX.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FRUITBOX.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {APIFERA.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {APIFERA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {DAVIDAN.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {DAVIDAN.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
      </div>
      <div className="flex flex-col w-70 mx-5">
        {ACVILIN.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FORWARD.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />

        {ACVAMONT.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {ACVAMONT.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />

        {CHOCO.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {CHOCO.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
      </div>
      <div className="flex flex-col w-70 mx-5">
        {COCACOLA.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {COCACOLA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {GLOBARSPIRIT.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {GLOBARSPIRIT.length - 1 !== index && (
                <Separator className="my-1" />
              )}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
        {BUISNESS.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BUISNESS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
      </div>
      <div className="flex flex-col w-70 mx-5">
        {UBFB.map((item, index) => {
          return (
            <div key={index} className="w-70 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {UBFB.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Separator className=" bg-blue-600 py-1 my-1" />
      </div>
    </div>
  );
};
