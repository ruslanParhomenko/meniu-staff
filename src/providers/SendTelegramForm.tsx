"use client";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSendTelegram } from "@/hooks/use-send-telegram";

import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { SendResetButton } from "@/components/buttons/SendResetButton";

export const OrderListTelegramForm = ({
  children,
  user,
  url,
}: {
  children: React.ReactNode;
  user: string;
  url: string;
}) => {
  const URL_TELEGRAM = {
    ttn: "/api/send-telegram-ttn",
    zn: "/api/send-telegram-zn",
  };

  const STORAGE_KEY = "orderListForm";
  const defaultValues = {
    text: "",
    rows: [],
  };

  const { sendTelegramMessage } = useSendTelegram();
  const { getValue, setValue, removeValue } =
    useLocalStorageForm<any>(STORAGE_KEY);

  const form = useForm<any>({
    defaultValues: {
      ...defaultValues,
      ...getValue(),
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setValue(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setValue]);
  const resetForm = () => {
    form.reset(defaultValues);
    removeValue();
  };

  const sendTextTelegram: SubmitHandler<any> = async (data) => {
    sendTelegramMessage(
      data,
      URL_TELEGRAM[url as keyof typeof URL_TELEGRAM],
      user
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendTextTelegram)}>
        {children}
        <SendResetButton resetForm={resetForm} />
      </form>
    </Form>
  );
};
