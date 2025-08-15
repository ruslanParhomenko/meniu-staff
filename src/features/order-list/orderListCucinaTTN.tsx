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
  QUANTITY_SELECT,
} from "./constants";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";

export const OrderListTTNCucine = () => {
  return (
    <div className="flex flex-col gap-10 w-full justify-start mx-5 sm:flex-row">
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">
          ROGOB
        </Label>
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
        <Label className="py-1 text-center font-bold text-blue-600">
          BLUESHARK
        </Label>
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

        <Label className="py-1 text-center font-bold text-blue-600">
          VITAFOR
        </Label>

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
      </div>
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">
          ARTACULINAR
        </Label>
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
        <Label className="py-1 text-center font-bold text-blue-600">
          PRESTAPAC
        </Label>
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
        <Label className="py-1 text-center font-bold text-blue-600">
          IMCOMVIL
        </Label>

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
        <Label className="py-1 text-center font-bold text-blue-600">
          ETALONUS
        </Label>

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
        <Label className="py-1 text-center font-bold text-blue-600">
          FORWARD
        </Label>
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
        <Label className="py-1 text-center font-bold text-blue-600">
          DELPHI
        </Label>
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
      </div>
      <div className="flex flex-col w-60 mx-5">
        <Label className="py-1 text-center font-bold text-blue-600">
          DINOVA
        </Label>
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
        <Label className="py-1 text-center font-bold text-blue-600">IUG</Label>
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
        <Label className="py-1 text-center font-bold text-blue-600">
          FRUITBOX
        </Label>
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
      </div>
    </div>
  );
};
