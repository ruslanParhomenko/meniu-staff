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
  LIST_TOBACCO,
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
import toast from "react-hot-toast";

export function ReportBarForm() {
  const STORAGE_KEY = "report-bar";
  const { isObserver } = useAbility();

  const {
    getValue,
    setValue: setLocalStorage,
    removeValue,
  } = useLocalStorageForm<ReportBarFormValues>(STORAGE_KEY);

  const form = useForm<ReportBarFormValues>({
    defaultValues: {
      ...defaultValuesReportBar,
      // ...getValue(),
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
        finalStock: String(
          Number(item.stock || 0) +
            Number(item.incoming || 0) -
            Number(item.outgoing || 0)
        ),
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
      date: new Date().toDateString(),
      tobacco: updatedTobacco as TobaccoSchemaType,
      cashVerify: cashVerifyDefault,
      expenses: expensesDefault,
    };

    form.reset(updatedData);
    toast.success("Бар отчет успешно сохранён !");
  };

  //supabase
  const watchAllFields = form.watch();
  useEffect(() => {
    const sendDataToApi = async () => {
      const localData = localStorage.getItem(STORAGE_KEY);
      if (!localData) return;

      try {
        const res = await fetch("/api/report-realtime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: 1,
            form_data: JSON.parse(localData),
          }),
        });

        const result = await res.json();
        if (result.error) {
          console.error("Sync error:", result.error);
        }
      } catch (err) {
        console.error("Request error:", err);
      }
    };

    const timeout = setTimeout(sendDataToApi, 500);
    return () => clearTimeout(timeout);
  }, [watchAllFields]);

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const res = await fetch("/api/report-realtime");
        const data = await res.json();

        if (data?.form_data) {
          const tobaccoWithLocalNames = data.form_data.tobacco.map(
            (item: any, idx: number) => ({
              ...item,
              name: LIST_TOBACCO[idx] || "",
              stock: String(item.stock) || "0",
            })
          );

          form.reset({
            ...data.form_data,
            date: data.form_data.date,
            tobacco: tobaccoWithLocalNames,
            cashVerify: data.form_data.cashVerify,
            expenses: data.form_data.expenses,
          });

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              ...data.form_data,
              tobacco: tobaccoWithLocalNames,
            })
          );
        }
      } catch (err) {
        console.error("Error fetching Supabase data:", err);
      }
    };

    fetchSupabaseData();
  }, []);

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
