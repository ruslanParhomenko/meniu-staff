"use client";
import dynamic from "next/dynamic";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SelectDataRange } from "./SelectDataRange";

const ScheduleFormComponent = () => {
  const form = useForm();

  return (
    <div className="w-full overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-full">
          <SelectDataRange />
        </form>
      </Form>
    </div>
  );
};

export const ScheduleForm = dynamic(
  () => Promise.resolve(ScheduleFormComponent),
  { ssr: false }
);
