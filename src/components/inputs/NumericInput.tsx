"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type NumericInputProps = {
  fieldName: string;
  id?: string;
  type?: string;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string | undefined;
  step?: number;
  min?: number;
  max?: number;
  className?: string;
};

function NumericInput({
  fieldName,
  id,
  placeholder,
  readonly,
  disabled,
  type = "text",
  step,
  min,
  max,
  className,
}: NumericInputProps) {
  const { control, watch } = useFormContext();
  watch();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={() => {
        return (
          <FormField
            control={control}
            name={fieldName}
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <div>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      type={type}
                      step={step}
                      min={min}
                      max={max}
                      id={id}
                      value={value ?? ""}
                      onChange={onChange}
                      readOnly={readonly}
                      disabled={disabled}
                      className={`flex w-15 items-center justify-center px-0 text-center text-xs md:w-36 md:text-base ${
                        className ?? ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        );
      }}
    />
  );
}
export default NumericInput;
