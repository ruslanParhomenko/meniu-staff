"use client";
import { format } from "date-fns";
import { ru, ro } from "date-fns/locale";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale, useTranslations } from "next-intl";
import { ArhiveBreakListTable } from "./ArhiveBreakListTable";
import { useBreakLists } from "@/hooks/use-break-list";

import type { Locale as DateFnsLocale } from "date-fns";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { use } from "react";

export const ArhiveForm = () => {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const localesMap: Record<string, DateFnsLocale> = {
    ru,
    ro,
  };

  const form = useForm();

  const { data: breakList, loading, error, refetch } = useBreakLists();

  const dataSelect = breakList?.map((item) => {
    const localeObj = localesMap[locale] || ru;
    return {
      label: item.id,
      value: format(new Date(item.date), "dd.MM.yyyy", {
        locale: localeObj,
      }),
    };
  });

  return (
    <Form {...form}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg cursor-pointer w-full [&>svg]:hidden bg-blue-600 px-4 py-2 text-white hover:bg-blue-400 hover:text-black no-underline! focus:no-underline">
            {t("breakList")}
          </AccordionTrigger>
          <AccordionContent>
            <ArhiveBreakListTable
              data={dataSelect}
              loading={loading}
              refetch={refetch}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Form>
  );
};
function useEffect(arg0: () => void) {
  throw new Error("Function not implemented.");
}
