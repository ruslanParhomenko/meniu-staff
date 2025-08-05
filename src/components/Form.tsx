"use client";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";

export type FormProps<T extends FieldValues> = {
  id?: string | undefined;
  form: UseFormReturn<T>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T> | undefined;
};

const Form = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({});
  const id = "form-id";

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <FormProvider {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
