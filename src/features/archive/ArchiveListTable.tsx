"use client";
import SelectInput from "@/components/inputs/SelectInput";
import { useWatch } from "react-hook-form";
import { DeleteListButton } from "../../components/buttons/DeleteListButton";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useApi } from "@/hooks/use-query";
import { useAbility } from "@/providers/AbilityProvider";
import { Label } from "@radix-ui/react-label";
import {
  BreakeList,
  DailyReport,
  DailyReportCucina,
  RemarkReport,
} from "@/generated/prisma";

type ApiDataMap = {
  breakList: BreakeList;
  report: DailyReport;
  "report-cucina": DailyReportCucina;
  remarks: RemarkReport;
};
type ApiDataByNameTag<T extends keyof ApiDataMap> = ApiDataMap[T];

export const ArhiveListTable = <T extends keyof ApiDataMap>({
  children,
  nameTag,
}: {
  children: (data: ApiDataMap[T]) => React.ReactNode;
  nameTag: T;
}) => {
  console.log(nameTag);
  const { isObserver } = useAbility();
  const t = useTranslations("Home");
  const [dataSelect, setDataSelect] = useState<
    { label: string; value: string }[]
  >([]);

  const [openItem, setOpenItem] = useState<string | null>(null);

  const { query, deleteMutation } = useApi<ApiDataByNameTag<T>>({
    endpoint: nameTag,
    queryKey: nameTag,
  });
  const { data } = isObserver ? { data: undefined } : query;

  const id = useWatch({ name: `selectDataId_${nameTag}` });
  const selected = data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (!data) return;
    const formattedData = data.map((item) => {
      return {
        label: item.id.toLocaleString(),
        value: format(new Date(item.date), "dd.MM.yy"),
      };
    });
    setDataSelect(formattedData);
  }, [data, nameTag]);

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
          {t(nameTag as string)}
        </AccordionTrigger>

        <AccordionContent>
          <div className="md:w-1/4 w-full py-4" key={nameTag}>
            {isObserver ? (
              <Label className="text-muted-foreground">
                {t("insufficientRights")}
              </Label>
            ) : (
              <SelectInput
                fieldName={`selectDataId_${nameTag}`}
                data={dataSelect}
                placeHolder={t("chooseItem")}
              />
            )}
          </div>

          {data && id && selected && (
            <>
              <DeleteListButton
                data={{
                  ...selected,
                  date: format(new Date(selected.date), "dd.MM.yy"),
                }}
                deleteMutation={deleteMutation.mutate}
              />
              {children(selected)}
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
