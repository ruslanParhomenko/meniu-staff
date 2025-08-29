"use client";
import { Form } from "@/components/ui/form";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { formatNowData } from "@/utils/formatNow";
import { useStopList } from "@/hooks/useStopList";
import {
  defaultStopListSchema,
  stopListSchema,
  StopListSchemaType,
} from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { StopListTable } from "./StopListTable";

export default function StopListForm() {
  const { stopListQuery, saveMutation } = useStopList();
  const { data, isLoading } = stopListQuery;

  const form = useForm<StopListSchemaType>({
    resolver: yupResolver(stopListSchema),
    defaultValues: defaultStopListSchema,
  });

  const stopListValues = useFieldArray({
    control: form.control,
    name: "stopList",
  });
  const stopListCucinaValues = useFieldArray({
    control: form.control,
    name: "stopListCucina",
  });
  useEffect(() => {
    if (!data) return;

    form.reset({
      stopList:
        Array.isArray(data.stopList) && data.stopList.length > 0
          ? data.stopList
          : defaultStopListSchema.stopList,
      stopListCucina:
        Array.isArray(data.stopListCucina) && data.stopListCucina.length > 0
          ? data.stopListCucina
          : defaultStopListSchema.stopListCucina,
    });
  }, [data, form]);

  const watchStopList = useWatch({ control: form.control, name: "stopList" });
  const watchStopListCucina = useWatch({
    control: form.control,
    name: "stopListCucina",
  });

  // Автозаполнение даты
  useEffect(() => {
    watchStopList.forEach((item, idx) => {
      if (item?.product && !item.date) {
        form.setValue(`stopList.${idx}.date`, formatNowData(), {
          shouldDirty: true,
        });
      }
    });
  }, [watchStopList]);

  // автозаполнение даты
  useEffect(() => {
    watchStopListCucina.forEach((item, idx) => {
      if (item?.product && !item.date) {
        form.setValue(`stopListCucina.${idx}.date`, formatNowData(), {
          shouldDirty: true,
        });
      }
    });
  }, [watchStopListCucina]);

  // авто-сохранение при изменении формы
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!values || !data) return;
      const payload = {
        id: data.id,
        stopList: values.stopList,
        stopListCucina: values.stopListCucina,
      };
      saveMutation.mutate(payload);
    });
    return () => subscription.unsubscribe();
  }, [form, data, saveMutation]);

  if (isLoading) return null;

  return (
    <Form {...form}>
      <form className="space-y-2">
        <div className="grid xl:grid-cols-2 gap-5">
          <StopListTable
            formFields={stopListValues}
            nameTag="bar"
            saveMutation={saveMutation}
          />
          <StopListTable
            formFields={stopListCucinaValues}
            nameTag="cucina"
            saveMutation={saveMutation}
          />
        </div>
      </form>
    </Form>
  );
}
