"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-dropdown-menu";
import SelectField from "@/components/inputs/SelectField";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import { useAbility } from "@/providers/AbilityProvider";
import { PRODUCTS, PRODUCTS_CUCINA } from "../report/bar/constants";
import { useTranslations } from "next-intl";
import SelectFieldWithSearch from "@/components/inputs/SelectWithSearch";

type StopListItem = {
  key: number;
  product?: string;
  date?: string;
};

type FormValues = {
  stopList: StopListItem[];
  stopListCucina: StopListItem[];
};

export default function TableStopListPrisma() {
  const t = useTranslations("Navigation");
  const { isObserver } = useAbility();

  const [recordId, setRecordId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultStopList: StopListItem[] = Array.from(
    { length: 12 },
    (_, i) => ({
      key: i + 1,
      product: "",
      date: "",
    })
  );

  const form = useForm<FormValues>({
    defaultValues: { stopList: defaultStopList },
  });

  const stopListValues = useWatch({
    control: form.control,
    name: "stopList",
  }) as StopListItem[];
  const stopListCucinaValues = useWatch({
    control: form.control,
    name: "stopListCucina",
  });

  useEffect(() => {
    const initRecord = async () => {
      try {
        const res = await fetch("/api/stop-list");
        let data = await res.json();

        if (!data) {
          const createRes = await fetch("/api/stop-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              stopList: defaultStopList.map(({ product, date }) => ({
                product,
                date,
              })),
            }),
          });

          data = await createRes.json();
        }

        setRecordId(data.id);
        form.reset({
          stopList: data.stopList?.map((item: any, idx: number) => ({
            key: idx + 1,
            product: item.product,
            date: item.date,
          })),
          stopListCucina: data.stopListCucina?.map(
            (item: any, idx: number) => ({
              key: idx + 1,
              product: item.product,
              date: item.date,
            })
          ),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initRecord();
  }, [form]);

  useEffect(() => {
    const now = new Date();

    stopListValues?.forEach((item, idx) => {
      if (item && item.product && !item.date) {
        form.setValue(
          `stopList.${idx}.date`,
          `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")} ${now
            .getHours()
            .toString()
            .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
        );
      }
    });
    stopListCucinaValues?.forEach((item, idx) => {
      if (item && item.product && !item.date) {
        form.setValue(
          `stopListCucina.${idx}.date`,
          `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")} ${now
            .getHours()
            .toString()
            .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
        );
      }
    });
  }, [stopListValues, form, stopListCucinaValues]);

  useEffect(() => {
    if (!stopListValues.length || loading || !recordId) return;
    setSaving(true);

    const saveData = async () => {
      try {
        const payload = {
          id: recordId,
          stopList: stopListValues?.map(({ product, date }) => ({
            product,
            date,
          })),
          stopListCucina: stopListCucinaValues?.map(({ product, date }) => ({
            product,
            date,
          })),
        };

        const res = await fetch("/api/stop-list", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Ошибка сохранения");
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    };

    const timeout = setTimeout(saveData, 500);
    return () => clearTimeout(timeout);
  }, [stopListValues, recordId, loading, stopListCucinaValues]);

  const clearSelect = (index: number) => {
    form.setValue(`stopList.${index}`, {
      ...stopListValues[index],
      product: "",
      date: "",
    });
  };
  const clearSelectCucina = (index: number) => {
    form.setValue(`stopListCucina.${index}`, {
      ...stopListCucinaValues[index],
      product: "",
      date: "",
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-2">
        <div className="grid md:grid-cols-2 ">
          <div className="md:px-5">
            <Label className="text-lg font-semibold pb-7">
              {t("stopListBar")} {saving && "(Saving...)"}
            </Label>
            <Table className="[&_th]:text-center [&_td]:text-center ">
              <TableHeader>
                <TableRow className="h-10 ">
                  <TableCell>Product</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stopListValues.map((item, idx) => (
                  <TableRow key={item.key}>
                    <TableCell>
                      <SelectField
                        data={PRODUCTS}
                        fieldName={`stopList.${idx}.product`}
                        disabled={isObserver}
                      />
                    </TableCell>
                    <TableCell>
                      {item.product && <Label>{item.date}</Label>}
                    </TableCell>
                    <TableCell>
                      {item.product && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => clearSelect(idx)}
                          disabled={isObserver}
                        >
                          <Delete />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="md:px-5">
            <Label className="text-lg font-semibold pb-7">
              {t("stopListCucina")} {saving && "(Saving...)"}
            </Label>
            <Table className="[&_th]:text-center [&_td]:text-center ">
              <TableHeader>
                <TableRow className="h-10 ">
                  <TableCell>Product</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stopListCucinaValues?.map((item, idx) => (
                  <TableRow key={item.key}>
                    <TableCell>
                      <SelectFieldWithSearch
                        data={PRODUCTS_CUCINA}
                        fieldName={`stopListCucina.${idx}.product`}
                        disabled={isObserver}
                        className="!h-9"
                      />
                    </TableCell>
                    <TableCell>
                      {item.product && <Label>{item.date}</Label>}
                    </TableCell>
                    <TableCell>
                      {item.product && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => clearSelectCucina(idx)}
                          disabled={isObserver}
                        >
                          <Delete />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </form>
    </Form>
  );
}
