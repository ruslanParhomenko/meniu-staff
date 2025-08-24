import SelectInput from "@/components/inputs/SelectInput";
import { useDataById } from "@/hooks/use-data-id";
import { useWatch } from "react-hook-form";
import { DeleteListButton } from "../ui/DeleteListButton";
import { useLocale, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { useData } from "@/hooks/use-data";

import { format, type Locale as DateFnsLocale } from "date-fns";
import { ro, ru } from "date-fns/locale";

export const ArhiveListTable = ({
  children,
  nameTag,
}: {
  children: (breakList: any) => React.ReactNode;
  nameTag: string;
}) => {
  const t = useTranslations("Navigation");

  const locale = useLocale();
  const localesMap: Record<string, DateFnsLocale> = {
    ru,
    ro,
  };

  const { data, refetch } = useData({
    api: nameTag,
  });
  const dataSelect = data
    ? data?.map((item) => {
        const localeObj = localesMap[locale] || ru;
        return {
          label: item.id.toLocaleString(),
          value: format(new Date(item.date), "dd.MM.yyyy", {
            locale: localeObj,
          }),
        };
      })
    : [{ label: "", value: "" }];

  const id = useWatch({ name: "selectDataId" });

  const { data: breakList, refetch: refetchId } = useDataById({
    id: id,
    api: nameTag,
  });

  const handleRefetch = () => {
    refetchId();
    refetch();
  };

  return (
    <Accordion type="single" collapsible className="mb-8">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg cursor-pointer w-full [&>svg]:hidden bg-blue-400 px-4 py-2 hover:bg-blue-600  no-underline! focus:no-underline">
          {t(nameTag)}
        </AccordionTrigger>
        <AccordionContent>
          <div className="md:w-1/4 w-full py-4 ">
            <SelectInput fieldName={"selectDataId"} data={dataSelect} />
          </div>
          {breakList && (
            <>
              <DeleteListButton
                data={breakList}
                api={nameTag}
                refetch={handleRefetch}
              />

              {children(breakList)}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
