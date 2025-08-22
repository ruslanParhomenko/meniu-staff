import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  UseFormReturn,
} from "react-hook-form";

import SelectField from "@/components/inputs/SelectField";
import { AddRemomeFieldsButton } from "@/features/ui/AddRemomeFieldsButton";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Separator } from "@radix-ui/react-separator";
import { use } from "react";
import { useAbility } from "@/providers/AbilityProvider";

type RenderEmployeesTableProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  form: UseFormReturn<T>;
  placeHolder: {
    field1: string;
    field2: string;
    field3: string;
  };

  dataArrayField1: string[];
  dataArrayField2: string[];
  dataArrayField3: string[];
  defaultValue: {};
};
export const RenderTableByFields = <T extends FieldValues>({
  name,
  form,
  placeHolder,
  dataArrayField1,
  dataArrayField2,
  dataArrayField3,
  defaultValue,
}: RenderEmployeesTableProps<T>) => {
  const t = useTranslations("Navigation");
  const fieldsArray = useFieldArray({ control: form.control, name: name });
  const { isObserver } = useAbility();

  const { field1, field2, field3 } = placeHolder;
  return (
    <div className="pt-4">
      <Label className="font-semibold py-2 text-md text-blue-600">
        {t(name as string)}
      </Label>
      <Separator className="py-px  bg-blue-600" />
      {fieldsArray.fields.map((field, index) => (
        <div key={field.id} className="flex items-center py-1">
          <div className="grid grid-cols-[40%_25%_15%] gap-1 md:grid-cols-[50%_20%_15%] md:gap-3 w-full ">
            {field1 && (
              <SelectField
                fieldName={`${name}.${index}.${field1}`}
                data={dataArrayField1}
                placeHolder={field1}
                disabled={isObserver}
                className="!text-gray-800"
              />
            )}
            {field2 && (
              <SelectField
                fieldName={`${name}.${index}.${field2}`}
                data={dataArrayField2}
                placeHolder={field2}
                disabled={isObserver}
                className="!text-gray-800"
              />
            )}
            {field3 && (
              <SelectField
                fieldName={`${name}.${index}.${field3}`}
                data={dataArrayField3}
                placeHolder={field3}
                disabled={isObserver}
                className="!text-gray-800"
              />
            )}
          </div>
          <div className="flex gap-2">
            <AddRemomeFieldsButton
              formField={fieldsArray}
              defaultValues={defaultValue}
              index={index}
              disabled={isObserver}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
