"use client";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  FRUITS,
  FRUITS_CUCINE,
  GREEN,
  GROCERIES,
  HIMICALS,
  MEAT,
  MILK,
  MISCELLANEOUS,
  NUTS,
  OFFICE,
  OTHER,
  PHARMACEUTICAL,
  SPICES,
  SPICES_2,
  VEGETABLES,
} from "./constants";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { OrderListBarFormValues } from "./schemas";

import { useSession } from "next-auth/react";
import { format } from "date-fns";

import toast from "react-hot-toast";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useMemo } from "react";

export const OrderListForm = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const nameOrder =
    pathname.split("/").pop()?.split("-")[1].toLocaleUpperCase() || "";
  const STORAGE_KEY = `order-form-${nameOrder}`;

  const t = useTranslations("UI");
  const session = useSession();

  // поля формы
  const allFields = useMemo(
    () => [
      ...FRUITS,
      ...GROCERIES,
      ...HIMICALS,
      ...MISCELLANEOUS,
      ...OFFICE,
      ...PHARMACEUTICAL,
      ...NUTS,
      ...SPICES,
      ...SPICES_2,
      ...VEGETABLES,
      ...GREEN,
      ...FRUITS_CUCINE,
      ...MEAT,
      ...MILK,
      ...OTHER,
    ],
    []
  );

  // базовые значения (все пустые)
  const defaultEmptyValues = Object.fromEntries(
    allFields.map((field) => [field, ""])
  ) as OrderListBarFormValues;

  // если есть localStorage данные — подгружаем
  const localValues =
    typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

  const parsedLocalValues = localValues
    ? (JSON.parse(localValues) as OrderListBarFormValues)
    : {};

  const form = useForm<OrderListBarFormValues>({
    defaultValues: {
      ...defaultEmptyValues,
      ...parsedLocalValues, // перезапишем если есть сохранённые
    },
  });

  // Подписка на изменения формы и сохранение в localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form.watch, STORAGE_KEY]);

  // Сабмит
  const sendTextTelegram: SubmitHandler<OrderListBarFormValues> = async (
    data
  ) => {
    const userName = session?.data?.user?.name ?? "Неизвестный пользователь";
    const formattedDate = format(new Date(), "dd.MM.yyyy HH:mm");

    const filteredData = Object.fromEntries(
      Object.entries(data)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([key, value]) => [key, Number(value)])
    );

    const body = Object.entries(filteredData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const message = `Заявка :${nameOrder}\n ${formattedDate}\n ${userName}\n\n${body}`;

    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success("Сообщение успешно отправлено!");
    } catch (e) {
      toast.error("Ошибка при отправке сообщения");
    }
  };

  // Сброс
  const resetForm = () => {
    form.reset(defaultEmptyValues);
    localStorage.removeItem(STORAGE_KEY);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendTextTelegram)}>
        {children}
        <div className="flex justify-start items-center p-5 pt-10 gap-4">
          <Button
            type="submit"
            variant={"default"}
            className="hover:bg-blue-600"
          >
            {t("send")}
          </Button>
          <Button
            type="button"
            variant={"secondary"}
            onClick={resetForm}
            className="hover:bg-red-600"
          >
            {t("reset")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
