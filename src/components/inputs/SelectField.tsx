"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  fieldName: string;
  placeHolder?: string;
  data: string[];
  disabled?: boolean;
};

function SelectField({ fieldName, placeHolder, data, disabled }: Props) {
  const { control } = useFormContext();

  const options = data.map((item) => ({ label: item, value: item }));

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormField
          control={control}
          name={fieldName}
          render={() => (
            <FormItem className="">
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled}
              >
                <FormControl className="w-full">
                  <SelectTrigger
                    data-placeholder=""
                    className="flex justify-center min-w-12  text-base [&>svg]:hidden"
                  >
                    <SelectValue placeholder={placeHolder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((item, index) => (
                    <SelectItem
                      key={`${item.value}-${index}`}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    />
  );
}

export default SelectField;
