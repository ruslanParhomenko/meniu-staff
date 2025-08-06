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

import { Label } from "../ui/label";

type Props = {
  fieldName: string;
  fieldLabel?: string;

  placeHolder?: string;
  data: { label: string; value: string }[];
  disabled?: boolean;
};

function SelectInput({
  fieldName,
  placeHolder,
  data,
  disabled,
  fieldLabel,
}: Props) {
  const { control, watch } = useFormContext();

  watch();
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormField
          control={control}
          name={fieldName}
          render={() => {
            return (
              <FormItem className="w-full">
                <Label>{fieldLabel}</Label>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger className="flex h-14 w-full justify-center py-2 text-base [&>svg]:hidden">
                      <SelectValue placeholder={placeHolder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((item) => {
                      return (
                        <SelectItem key={item.label} value={item.label}>
                          {item.value}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      )}
    />
  );
}
export default SelectInput;
