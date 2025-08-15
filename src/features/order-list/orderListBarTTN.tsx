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
  UBFB2,
  QUANTITY_SELECT,
} from "./constants";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";

export const OrderListTTNBar = () => {
  return (
    <div className="flex flex-col  w-full justify-start mx-5 sm:flex-row">
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">
          AQUATRADE
        </Label>
        {AQUATRADE.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {AQUATRADE.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          BUCURIA
        </Label>
        {BUCURIA.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BUCURIA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          BUISNESS
        </Label>
        {BUISNESS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BUISNESS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          VERGNANO
        </Label>
        {VERGNANO.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {VERGNANO.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          FRUITBOX
        </Label>
        {FRUITBOX.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {FRUITBOX.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">
          ACVILIN
        </Label>
        {ACVILIN.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {ACVILIN.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">
          COCACOLA
        </Label>
        {COCACOLA.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {COCACOLA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          GLOBARSPIRIT
        </Label>
        {GLOBARSPIRIT.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
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
        <Label className="py-1 text-center font-bold text-blue-600">
          BUISNESS
        </Label>
        {BUISNESS.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {BUISNESS.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">UBFB</Label>
        {UBFB.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {UBFB.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-60 mx-5">
        {UBFB2.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {UBFB.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          ACVAMONT
        </Label>

        {ACVAMONT.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {ACVAMONT.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          CHOCO
        </Label>

        {CHOCO.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {CHOCO.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          APIFERA
        </Label>
        {APIFERA.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {APIFERA.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          DAVIDAN
        </Label>
        {DAVIDAN.map((item, index) => {
          return (
            <div key={index} className="w-60 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              {DAVIDAN.length - 1 !== index && <Separator className="my-1" />}
            </div>
          );
        })}
        <Label className="py-1 text-center font-bold text-blue-600">
          FORWARD
        </Label>
        {FORWARD.map((item, index) => {
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
      </div>
    </div>
  );
};
