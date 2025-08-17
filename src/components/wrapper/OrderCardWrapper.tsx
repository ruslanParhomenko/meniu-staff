"use client";
import SelectInput from "../inputs/SelectInput";
import { Label } from "../ui/label";
import { QUANTITY_SELECT } from "@/features/order-list/constants";
import { Separator } from "../ui/separator";
import { useAbility } from "@/providers/AbilityProvider";

export function OrderCardWrapper({
  data,
  name,
}: {
  data: string[];
  name: string;
}) {
  const { isObserver } = useAbility();
  return (
    <div>
      <div className="flex flex-col w-full justify-center items-center py-2">
        <Label className="py-2  font-bold text-blue-600">{name}</Label>
      </div>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <SelectInput
              fieldName={item}
              fieldLabel={item}
              data={QUANTITY_SELECT}
              disabled={isObserver}
            />
            {data.length - 1 !== index && <Separator className="my-1" />}
          </div>
        );
      })}
    </div>
  );
}
