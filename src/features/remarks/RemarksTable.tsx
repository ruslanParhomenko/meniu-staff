"use client";

import SelectInput from "@/components/inputs/SelectInput";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEmployeeSqlData } from "@/hooks/use-employee-sql";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SendResetButton } from "../ui/SendResetButton";
import SelectField from "@/components/inputs/SelectField";
import { useTranslations } from "next-intl";

import DatePickerInput from "@/components/inputs/DatePickerInput";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { OVER_HOURS, PENALITY, REASON } from "./constants";
import toast from "react-hot-toast";
import { useAbility } from "@/providers/AbilityProvider";
import { useSession } from "next-auth/react";
import { USER_EMAIL_FETCH_DATA } from "@/constants/emailUserFetchData";

type RemarksForm = {
  date: Date;
  remarks: {
    name: string;
    dayHours?: string;
    nightHours?: string;
    reason?: string;
    penality?: string;
    reasonPenality?: string;
  }[];
};

const defaultData: RemarksForm = {
  date: new Date(),
  remarks: new Array(10).fill({
    name: "",
    dayHours: "",
    nightHours: "",
    reason: "",
    penality: "",
    reasonPenality: "",
  }),
};

export default function RemarksTable() {
  const { isObserver, isUser } = useAbility();
  const session = useSession();
  const KEY_LOCAL = "remarks";
  const {
    getValue,
    setValue: setLocalStorage,
    removeValue,
  } = useLocalStorageForm<RemarksForm>(KEY_LOCAL);
  const t = useTranslations("Navigation");

  const localData = getValue();
  const form = useForm<RemarksForm>({
    defaultValues: {
      ...defaultData,
      ...localData,
    },
  });
  const { employees } = useEmployeeSqlData();

  const selectedEmployees = useMemo(
    () =>
      employees.map((employee) => ({
        label: employee.name,
        value: employee.name,
      })),
    [employees]
  );
  useEffect(() => {
    const subscription = form.watch((value) =>
      setLocalStorage(value as RemarksForm)
    );
    return () => subscription.unsubscribe();
  }, [form, setLocalStorage]);

  const resetForm = () => {
    form.reset(defaultData);
    removeValue();
  };
  const handleSubmit: SubmitHandler<RemarksForm> = async (data) => {
    try {
      const res = await fetch("/api/remarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      toast.success("Отчет успешно создан");
    } catch (err) {}
  };

  const watchAllFields = form.watch();
  useEffect(() => {
    const sendDataToApi = async () => {
      const localData = localStorage.getItem(KEY_LOCAL);
      if (!localData) return;
      if (!isUser) return;

      try {
        const res = await fetch("/api/remarks-realtime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: session?.data?.user?.email,
            form_data: JSON.parse(localData),
          }),
        });

        const result = await res.json();
        if (result.error) {
        }
      } catch (err) {}
    };

    const timeout = setTimeout(sendDataToApi, 500);
    return () => clearTimeout(timeout);
  }, [watchAllFields]);

  const fetchSupabaseData = async () => {
    try {
      const res = await fetch("/api/remarks-realtime");
      const allData = await res.json();

      const userData = allData.find(
        (item: any) => item.user_email === USER_EMAIL_FETCH_DATA
      );

      if (userData?.form_data) {
        form.reset({
          ...userData.form_data,
          date: userData.form_data.date,
          remarks: userData.form_data.remarks,
        });

        localStorage.setItem(
          KEY_LOCAL,
          JSON.stringify({
            ...userData.form_data,
          })
        );
      }
    } catch (err) {}
  };

  const remarks = form.watch("remarks");
  return (
    <div className="w-full  p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <Label className="text-lg font-semibold pb-7">Employee Remarks</Label>
          <div className="md:px-6">
            <DatePickerInput fieldName="date" />
          </div>
          <Table className="[&_th]:text-center [&_td]:text-center ">
            <TableHeader>
              <TableRow className="h-10">
                <TableCell className="text-center">Name</TableCell>
                <TableCell className="text-center"> day hours</TableCell>
                <TableCell className="text-center"> night hours</TableCell>
                <TableCell className="text-center">reason</TableCell>
                <TableCell className="text-center">penality</TableCell>
                <TableCell className="text-center ">reason penality</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remarks?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className=" min-w-40 md:px-6">
                    <SelectInput
                      fieldName={`remarks.${idx}.name`}
                      fieldLabel=""
                      data={selectedEmployees}
                      disabled={isObserver}
                    />
                  </TableCell>
                  <TableCell className="min-w-20 md:px-6">
                    <SelectField
                      fieldName={`remarks.${idx}.dayHours`}
                      data={OVER_HOURS}
                      disabled={isObserver}
                    />
                  </TableCell>
                  <TableCell className="min-w-20 md:px-6">
                    <SelectField
                      fieldName={`remarks.${idx}.nightHours`}
                      data={OVER_HOURS}
                      disabled={isObserver}
                    />
                  </TableCell>
                  <TableCell className="min-w-40 md:px-6">
                    <SelectField
                      fieldName={`remarks.${idx}.reason`}
                      data={REASON.map((reason) => t(reason) as string)}
                      disabled={isObserver}
                    />
                  </TableCell>
                  <TableCell className="min-w-20 md:px-6 ">
                    <SelectField
                      fieldName={`remarks.${idx}.penality`}
                      data={PENALITY}
                      disabled={isObserver}
                    />
                  </TableCell>
                  <TableCell className="min-w-40 md:px-6">
                    <SelectField
                      fieldName={`remarks.${idx}.reasonPenality`}
                      data={REASON.map((reason) => t(reason) as string)}
                      disabled={isObserver}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <SendResetButton
            resetForm={resetForm}
            fetchData={fetchSupabaseData}
          />
        </form>
      </Form>
    </div>
  );
}
