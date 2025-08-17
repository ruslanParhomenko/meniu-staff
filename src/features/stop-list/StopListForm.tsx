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
import { PRODUCTS } from "../report/constants";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useEffect, useState } from "react";
import { useAbility } from "@/providers/AbilityProvider";

type StopListItem = {
  key: number;
  product?: string;
  date?: string;
};

type FormValues = {
  stopList: StopListItem[];
};

export default function TableStopListPrisma() {
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
          stopList: data.stopList.map((item: any, idx: number) => ({
            key: idx + 1,
            product: item.product,
            date: item.date,
          })),
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

    stopListValues.forEach((item, idx) => {
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
  }, [stopListValues, form]);

  useEffect(() => {
    if (!stopListValues.length || loading || !recordId) return;
    setSaving(true);

    const saveData = async () => {
      try {
        const payload = {
          id: recordId,
          stopList: stopListValues.map(({ product, date }) => ({
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
  }, [stopListValues, recordId, loading]);

  const clearSelect = (index: number) => {
    form.setValue(`stopList.${index}`, {
      ...stopListValues[index],
      product: "",
      date: "",
    });
  };

  return (
    <div className="w-full md:w-2/4 px-2">
      <Form {...form}>
        <form className="space-y-2">
          <Label className="text-lg font-semibold pb-7">
            Stop List {saving && "(Saving...)"}
          </Label>

          <Table className="[&_th]:text-center [&_td]:text-center">
            <TableHeader>
              <TableRow className="h-10">
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
        </form>
      </Form>
    </div>
  );
}
