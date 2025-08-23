"use client";

import { useState, useMemo } from "react";
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
  className?: string;
};

function SelectFieldWithSearch({
  fieldName,
  placeHolder,
  data,
  disabled,
  className,
}: Props) {
  const { control } = useFormContext();
  const [search, setSearch] = useState("");

  // фильтруем данные по введенному поиску
  const filteredOptions = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

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
                    className={`${className} flex justify-center min-w-12 [&>svg]:hidden`}
                  >
                    <SelectValue
                      placeholder={placeHolder}
                      onInput={(e: any) => setSearch(e.target.value)}
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {/* Опционально: добавить input для поиска сверху */}
                  <div className="px-2 py-1">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-sm"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  {filteredOptions.map((item, index) => (
                    <SelectItem key={`${item}-${index}`} value={item}>
                      {item}
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

export default SelectFieldWithSearch;
