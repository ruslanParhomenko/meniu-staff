"use client";
import SelectInput from "@/components/inputs/SelectInput";
import { useDataById } from "@/hooks/use-data-id";
import { useWatch } from "react-hook-form";
import { DeleteListButton } from "../../components/buttons/DeleteListButton";
import { useLocale, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
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

  const [dataSelect, setDataSelect] = useState([{ label: "", value: "" }]);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const { data, refetch } = useData({
    api: nameTag,
  });

  const id = useWatch({ name: `selectDataId_${nameTag}` });

  const { data: dataId, refetch: refetchId } = useDataById<any>({
    id: id,
    api: nameTag,
  });

  useEffect(() => {
    if (!data) return;
    const formattedData = data?.map((item) => {
      const localeObj = localesMap[locale] || ru;
      return {
        label: item.id.toLocaleString(),
        value: format(new Date(item.date), "dd.MM.yyyy", {
          locale: localeObj,
        }),
      };
    });
    setDataSelect(formattedData);
  }, [data, nameTag]);

  const handleRefetch = () => {
    refetchId();
    refetch();
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="mb-8"
      value={openItem ?? ""}
      onValueChange={(val) => setOpenItem(val)}
    >
      <AccordionItem value={nameTag}>
        <AccordionTrigger
          className="text-lg cursor-pointer w-full  [&>svg]:hidden px-4 py-2 hover:no-underline"
          style={{
            backgroundColor: "#60a5fa",
            color: "#1f2937",
          }}
        >
          {t(nameTag)}
        </AccordionTrigger>

        <AccordionContent>
          <div className="md:w-1/4 w-full py-4" key={nameTag}>
            <SelectInput
              fieldName={`selectDataId_${nameTag}`}
              data={dataSelect}
            />
          </div>

          {dataId && (
            <>
              <DeleteListButton
                data={dataId}
                api={nameTag}
                refetch={handleRefetch}
              />
              {children(dataId)}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
