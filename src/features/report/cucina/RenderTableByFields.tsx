"use client";
import {
  ArrayPath,
  FieldArrayPath,
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
import { useEffect } from "react";

type RenderEmployeesTableProps = {
  name: ArrayPath<ReportCucinaType>;
  form: UseFormReturn<ReportCucinaType>;
  placeHolder: {
    field1: string;
    field2: string;
    field3: string;
    field4?: string;
  };

  dataArrayField1?: string[];
  dataArrayField2?: string[];
  dataArrayField3?: string[];
  defaultValue: {};
};

const formatNow = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};
const RenderTable = ({
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

  const { field1, field2, field3, field4 } = placeHolder;

  useEffect(() => {
    const subscription = form.watch((values, { name: changedName }) => {
      if (changedName?.includes(field1)) {
        fieldsArray.fields.forEach((_, idx) => {
          const productValue = form.getValues(
            `${name}.${idx}.${field1}` as FieldArrayPath<ReportCucinaType>
          );
          const dateValue = form.getValues(
            `${name}.${idx}.${field4}` as FieldArrayPath<ReportCucinaType>
          );

          if (productValue && !dateValue) {
            form.setValue(
              `${name}.${idx}.${field4}` as FieldArrayPath<ReportCucinaType>,
              formatNow() as any
            );
          }
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, name, field1, field4, fieldsArray.fields]);

  return (
    <div className="pt-6">
      <Label className="font-semibold py-2 text-md text-blue-600">
        {t(name as string)} :
      </Label>
      <Separator className="py-px my-1 bg-blue-600" />

      {fieldsArray.fields.map((field, index) => {
        const productValue = form.watch(
          `${name}.${index}.${field1}` as FieldArrayPath<ReportCucinaType>
        );

        return (
          <div key={field.id} className="grid grid-cols-[90%_10%]">
            <div className="grid grid-cols-[40%_20%_20%_8%] gap-1 md:grid-cols-[40%_20%_20%_10%] md:gap-3 w-full pb-2 ">
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
              {field4 && productValue && (
                <div className="text-sm text-red-600 flex items-center justify-center">
                  {form.watch(`${name}.${index}.${field4}` as any)}
                </div>
              )}
            </div>

            <div className="flex gap-1">
              <AddRemomeFieldsButton
                formField={fieldsArray}
                defaultValues={defaultValue}
                index={index}
                disabled={isObserver}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const RenderTableByFields = dynamic(() => Promise.resolve(RenderTable), {
  ssr: false,
  loading: () => (
    <div className="text-center h-10 text-4xl text-blue-800">...</div>
  ),
});
