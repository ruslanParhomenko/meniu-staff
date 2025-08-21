"use client";
import SelectInput from "../inputs/SelectInput";
import { Label } from "../ui/label";
import { QUANTITY_SELECT } from "@/features/order-list/constants";
import { Separator } from "../ui/separator";
import { useAbility } from "@/providers/AbilityProvider";
import { useFormContext, useWatch } from "react-hook-form";

export function OrderCardWrapper({
  data,
  name,
}: {
  data: string[];
  name: string;
}) {
  const { isObserver } = useAbility();
  const { setValue, control } = useFormContext();
  return (
    <div>
      <div className="flex flex-col w-full justify-center items-center py-2">
        <Label className="py-2  font-bold text-blue-600">{name}</Label>
      </div>
      {data.map((item, index) => {
        const value = useWatch({ control, name: item });
        return (
          <div key={index}>
            <div className="grid-cols-[95%_5%] grid">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
                disabled={isObserver}
              />
              {value && (
                <button
                  type="button"
                  className=" text-red-600 front-bold"
                  onClick={() => setValue(item, "")}
                >
                  -
                </button>
              )}
            </div>
            {data.length - 1 !== index && <Separator className="my-1" />}
          </div>
        );
      })}
    </div>
  );
}
