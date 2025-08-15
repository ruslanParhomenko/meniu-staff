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
import { useReportList } from "@/hooks/use-report-list";
import { ArhiveReportListTable } from "./ArhiveReportBarTable";

export const ArhiveForm = () => {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const localesMap: Record<string, DateFnsLocale> = {
    ru,
    ro,
  };

  const form = useForm();

  const { data: breakList, loading, error, refetch } = useBreakLists();
  const { data: reportList } = useReportList();

  const dataSelect = breakList?.map((item) => {
    const localeObj = localesMap[locale] || ru;
    return {
      label: item.id,
      value: format(new Date(item.date), "dd.MM.yyyy", {
        locale: localeObj,
      }),
    };
  });

  const dataSelectReport = reportList?.map((item) => {
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
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg cursor-pointer w-full [&>svg]:hidden bg-blue-400 px-4 py-2 hover:bg-blue-600  no-underline! focus:no-underline">
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
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg cursor-pointer w-full [&>svg]:hidden bg-blue-400 px-4 py-2 hover:bg-blue-600  no-underline! focus:no-underline">
            {t("report")}
          </AccordionTrigger>
          <AccordionContent>
            <ArhiveReportListTable data={dataSelectReport} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Form>
  );
};
