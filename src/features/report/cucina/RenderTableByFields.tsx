"use client";
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
import { useAbility } from "@/providers/AbilityProvider";
import dynamic from "next/dynamic";
import { ReportCucinaType } from "./schema";
import SelectFieldWithSearch from "@/components/inputs/SelectWithSearch";
import NumericInput from "@/components/inputs/NumericInput";

type RenderEmployeesTableProps = {
  name: ArrayPath<ReportCucinaType>;
  form: UseFormReturn<ReportCucinaType>;
  placeHolder: {
    field1: string;
    field2: string;
    field3: string;
  };

  dataArrayField1?: string[];
  dataArrayField2?: string[];
  dataArrayField3?: string[];
  defaultValue: {};
};
const RenderTable = <T extends FieldValues>({
  name,
  form,
  placeHolder,
  dataArrayField1,
  dataArrayField2,
  dataArrayField3,
  defaultValue,
}: RenderEmployeesTableProps) => {
  const t = useTranslations("Navigation");
  const fieldsArray = useFieldArray({ control: form.control, name: name });
  const { isObserver } = useAbility();

  const { field1, field2, field3 } = placeHolder;
  return (
    <div className="pt-6">
      <Label className="font-semibold py-2 text-md text-blue-600">
        {t(name as string)} :
      </Label>
      <Separator className="py-px my-1  bg-blue-600" />
      {fieldsArray.fields.map((field, index) => (
        <div key={field.id} className="flex items-center ">
          <div className="grid grid-cols-[50%_25%_15%] gap-1 md:grid-cols-[50%_20%_15%] md:gap-3 w-full ">
            {field1 && dataArrayField1 && (
              <SelectFieldWithSearch
                fieldName={`${name}.${index}.${field1}`}
                data={dataArrayField1}
                placeHolder={field1 ? t(field1) : ""}
                disabled={isObserver}
              />
            )}
            {field2 && dataArrayField2 ? (
              <SelectField
                fieldName={`${name}.${index}.${field2}`}
                data={dataArrayField2}
                placeHolder={field2 ? t(field2) : ""}
                disabled={isObserver}
              />
            ) : (
              <NumericInput
                fieldName={`${name}.${index}.${field2}`}
                placeholder={field2 ? t(field2) : ""}
                disabled={isObserver}
              />
            )}
            {field3 && dataArrayField3 ? (
              <SelectField
                fieldName={`${name}.${index}.${field3}`}
                data={dataArrayField3}
                placeHolder={field3 ? t(field3) : ""}
                disabled={isObserver}
              />
            ) : (
              <NumericInput
                fieldName={`${name}.${index}.${field3}`}
                placeholder={field3 ? t(field3) : ""}
                disabled={isObserver}
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

export const RenderTableByFields = dynamic(() => Promise.resolve(RenderTable), {
  ssr: false,
  loading: () => (
    <div className="text-center h-10 text-4xl text-blue-800">...</div>
  ),
});
