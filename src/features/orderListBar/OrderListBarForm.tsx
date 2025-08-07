"use client";
import SelectInput from "@/components/inputs/SelectInput";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { QUANTITY_SELECT } from "../orderList/constants";
import { Separator } from "@/components/ui/separator";
import {
  FRUITS,
  GROCERIES,
  HIMICALS,
  MISCELLANEOUS,
  OFFICE,
  PHARMACEUTICAL,
} from "./constants";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { OrderListBarFormValues } from "./schemas";

import toast from "react-hot-toast";

export const OrderListBarForm = () => {
  const t = useTranslations("UI");
  const defaultValues: OrderListBarFormValues = {};

  [
    ...FRUITS,
    ...GROCERIES,
    ...HIMICALS,
    ...MISCELLANEOUS,
    ...OFFICE,
    ...PHARMACEUTICAL,
  ].forEach((field) => {
    defaultValues[field] = "";
  });

  const form = useForm<OrderListBarFormValues>({
    defaultValues: defaultValues,
  });

  const sendTextTelegram: SubmitHandler<OrderListBarFormValues> = async (
    data
  ) => {
    const filteredData = Object.fromEntries(
      Object.entries(data)
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => [key, Number(value)])
    );

    const message = Object.entries(filteredData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

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

  const resetForm = () => {
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendTextTelegram)}>
        <div className="flex flex-row gap-10 w-full justify-start mx-5">
          <div className="flex flex-col w-80 mx-5">
            {FRUITS.map((item, index) => {
              return (
                <div key={index} className="w-80 ">
                  <SelectInput
                    fieldName={item}
                    fieldLabel={item}
                    data={QUANTITY_SELECT}
                  />
                  {FRUITS.length - 1 !== index && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}
            <Separator className=" bg-blue-700 py-1 my-2" />
            {GROCERIES.map((item, index) => {
              return (
                <div key={index} className="w-80 ">
                  <SelectInput
                    fieldName={item}
                    fieldLabel={item}
                    data={QUANTITY_SELECT}
                  />
                  {GROCERIES.length - 1 !== index && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}
            <Separator className=" bg-blue-700 py-1 my-2" />
            {MISCELLANEOUS.map((item, index) => {
              return (
                <div key={index} className="w-80 ">
                  <SelectInput
                    fieldName={item}
                    fieldLabel={item}
                    data={QUANTITY_SELECT}
                  />
                  {MISCELLANEOUS.length - 1 !== index && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-80 mx-5">
            {PHARMACEUTICAL.map((item, index) => {
              return (
                <div key={index} className="w-80 ">
                  <SelectInput
                    fieldName={item}
                    fieldLabel={item}
                    data={QUANTITY_SELECT}
                  />
                  {PHARMACEUTICAL.length - 1 !== index && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}
            <Separator className=" bg-blue-700 py-1 my-2" />
            {OFFICE.map((item, index) => {
              return (
                <div key={index} className="w-80 ">
                  <SelectInput
                    fieldName={item}
                    fieldLabel={item}
                    data={QUANTITY_SELECT}
                  />
                  {OFFICE.length - 1 !== index && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}
            <Separator className=" bg-blue-700 py-1 my-2" />
            {HIMICALS.map((item, index) => {
              return (
                <div key={index} className="w-80 ">
                  <SelectInput
                    fieldName={item}
                    fieldLabel={item}
                    data={QUANTITY_SELECT}
                  />
                  {HIMICALS.length - 1 !== index && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-start items-center p-5 pt-20 gap-4">
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
