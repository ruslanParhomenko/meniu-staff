"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TextInputProps = {
  fieldName: string;
  fieldLabel?: string | undefined;
  placeholder?: string | undefined;
  multiline?: boolean | undefined;
  rows?: number | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
  type?: string;
  withButton?: React.ReactNode;
};

function TextInput({
  fieldName,
  fieldLabel,
  placeholder,
  type,
  withButton,
}: TextInputProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      defaultValue={""}
      render={({ field }) => {
        return (
          <FormItem className="grid grid-cols-1 place-items-start justify-items-start gap-1 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3">
            <Label className="text-nowrap text-[16px] font-semibold lg:pr-14">
              {fieldLabel}
            </Label>

            <div className="w-full">
              <div className="flex gap-2">
                <FormControl className="w-full">
                  <Input placeholder={placeholder} type={type} {...field} />
                </FormControl>

                {withButton}
              </div>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
}
export default TextInput;
