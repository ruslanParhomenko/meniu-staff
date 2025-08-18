"use client";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { SendResetButton } from "../ui/SendResetButton";
import TableTobacco from "./TableTobacco";
import { Form } from "@/components/ui/form";
import TableEspenses from "./TableExpenses";
import {
  cashVerifyDefault,
  defaultValuesReportBar,
  expensesDefault,
  ReportBarFormValues,
  reportBarSchema,
  TobaccoSchemaType,
} from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { useEffect } from "react";
import TableCashVerify from "./TableCashVerify";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import { useAbility } from "@/providers/AbilityProvider";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "next-auth/react";
import { da } from "date-fns/locale";

export function ReportBarForm() {
  const STORAGE_KEY = "report-bar";
  const { isObserver } = useAbility();

  const session = useSession();

  const {
    getValue,
    setValue: setLocalStorage,
    removeValue,
  } = useLocalStorageForm<ReportBarFormValues>(STORAGE_KEY);

  const form = useForm<ReportBarFormValues>({
    defaultValues: {
      ...defaultValuesReportBar,
      ...getValue(),
    },
    resolver: yupResolver(
      reportBarSchema
    ) as unknown as Resolver<ReportBarFormValues>,
  });
  useEffect(() => {
    const subscription = form.watch((value) => {
      setLocalStorage(value as ReportBarFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setLocalStorage]);

  const resetForm = () => {
    const currentValues = form.getValues();
    const resetTobacco = currentValues?.tobacco?.map((item) => ({
      ...item,
      incoming: null,
      outgoing: null,
    }));

    form.reset({
      ...currentValues,
      date: new Date().toDateString(),
      tobacco: resetTobacco as TobaccoSchemaType,
      cashVerify: cashVerifyDefault,
      expenses: expensesDefault,
    });

    removeValue();
  };
  const handleSubmit: SubmitHandler<ReportBarFormValues> = async (data) => {
    const formatedData = {
      ...data,
      date: data.date,
      tobacco: data.tobacco?.map((item) => ({
        ...item,
        stock: Number(item.stock || 0),
        incoming: Number(item.incoming || 0),
        outgoing: Number(item.outgoing || 0),
        finalStock: String(item.finalStock || "0"),
      })),
    };
    const res = await fetch("/api/report/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatedData),
    });

    const updatedTobacco = data?.tobacco?.map((item) => {
      const finalStock =
        Number(item.stock || 0) +
        Number(item.incoming ?? 0) -
        Number(item.outgoing ?? 0);

      return {
        ...item,
        stock: finalStock,
        incoming: null,
        outgoing: null,
      };
    });

    const updatedData: ReportBarFormValues = {
      ...data,
      tobacco: updatedTobacco as TobaccoSchemaType,
    };

    form.reset(updatedData);
  };

  //supabase

  useEffect(() => {
    const interval = setInterval(async () => {
      const localData = getValue();
      if (!localData) return;

      await supabase.from("report_bar_realtime").insert({
        user_email: session?.data ? session?.data.user?.email : "anonymous",
        form_data: localData,
      });
    }, 30 * 60 * 1000); // 30 минут

    return () => clearInterval(interval);
  }, [getValue, session?.data ? session?.data.user?.email : "anonymous"]);

  useEffect(() => {
    const channel = supabase
      .channel("report_bar_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "report_bar_realtime" },
        (payload) => {
          console.log("📥 Новые данные:", payload.new);

          // можно обновить форму или localStorage
          const newData = payload.new.form_data as ReportBarFormValues;

          // например — обновим локально, только если дата совпадает
          if (newData?.date === form.getValues("date")) {
            form.reset(newData);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {!isObserver && <DatePickerInput fieldName="date" />}

        <div className="grid grid-cols-1 md:grid-cols-[50%_5%_25%] md:gap-20 md:pr-20 pt-4">
          <TableTobacco />
          <div className="w-full" />
          <TableEspenses />
        </div>
        <TableCashVerify />
        <SendResetButton resetForm={resetForm} />
      </form>
    </Form>
  );
}
