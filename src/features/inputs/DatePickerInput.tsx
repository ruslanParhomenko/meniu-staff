import { useFormContext } from "react-hook-form";

import { format, Locale } from "date-fns";
import { ru, de, fr, enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

type TextInputProps = {
  fieldName: string;
  fieldLabel?: string | undefined;
};

function DatePickerInput({ fieldName, fieldLabel }: TextInputProps) {
  const tDate = useTranslations("Date");
  const locale = useLocale();
  const locales: Record<string, Locale> = {
    ru: ru,
    de: de,
    fr: fr,
    en: enUS,
  };
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className="flex w-1/6  gap-3">
            <FormLabel className=" align-baseline text-blue-700 text-2xl flex-1/3 ">
              {fieldLabel}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild className="flex-2/3 ">
                <FormControl className="w-full">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "p-4 text-center font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "LLL dd,   y", {
                        locale: locales[locale],
                      })
                    ) : (
                      <span>{tDate("pickADate")}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-8 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-4 " align="center">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  weekStartsOn={1}
                  locale={locales[locale]}
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
export default DatePickerInput;
