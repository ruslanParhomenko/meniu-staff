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
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { SendResetButton } from "../../components/buttons/SendResetButton";
import SelectField from "@/components/inputs/SelectField";
import { useTranslations } from "next-intl";

import DatePickerInput from "@/components/inputs/DatePickerInput";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { OVER_HOURS, PENALITY, REASON } from "./constants";
import toast from "react-hot-toast";
import { BAR, useAbility } from "@/providers/AbilityProvider";
import { useSession } from "next-auth/react";
import { FetchDataButton } from "../../components/buttons/FetchDataButton";
import { defaultRemarks, defaultRemarksForm, RemarksForm } from "./schema";
import { useEmployees } from "@/hooks/useEmploees";
import { AddRemoveFieldsButton } from "@/components/buttons/AddRemoveFieldsButton";

export default function RemarksTable() {
  const { isObserver, isBar } = useAbility();
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
      ...defaultRemarksForm,
      ...localData,
    },
  });
  const { employeesQuery } = useEmployees();

  const employees = employeesQuery.data || [];

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
    form.reset(defaultRemarksForm);
    removeValue();
  };
  const handleSubmit: SubmitHandler<RemarksForm> = async (data) => {
    try {
      await fetch("/api/remarks", {
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
      if (!isBar) return;

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

      const userData = allData.find((item: any) => item.user_email === BAR[0]);

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

  const remarks = useFieldArray({
    control: form.control,
    name: "remarks",
  });

  console.log(remarks.fields);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2 p-5"
      >
        <Label className="text-lg font-semibold pb-7">Employee Remarks</Label>
        <div className="flex items-center gap-4 justify-between">
          <DatePickerInput fieldName="date" />
          <FetchDataButton fetchData={fetchSupabaseData} />
        </div>
        <Table className="[&_th]:text-center [&_td]:text-center table-fixed xl:w-300 w-150">
          <TableHeader>
            <TableRow className="h-10 ">
              <TableCell className="text-center md:w-80 w-12">Name</TableCell>
              <TableCell className="text-center md:w-20 w-5">
                {" "}
                day hours
              </TableCell>
              <TableCell className="text-center md:w-20 w-5">
                night hours
              </TableCell>
              <TableCell className="text-center md:w-40 w-8">
                penality
              </TableCell>
              <TableCell className="text-center md:w-80 w-8">reason</TableCell>
              <TableCell className="text-center md:w-20 w-5">actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {remarks?.fields?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <SelectInput
                    fieldName={`remarks.${idx}.name`}
                    fieldLabel=""
                    data={selectedEmployees}
                    disabled={isObserver}
                  />
                </TableCell>
                <TableCell>
                  <SelectField
                    fieldName={`remarks.${idx}.dayHours`}
                    data={OVER_HOURS}
                    disabled={isObserver}
                  />
                </TableCell>
                <TableCell>
                  <SelectField
                    fieldName={`remarks.${idx}.nightHours`}
                    data={OVER_HOURS}
                    disabled={isObserver}
                  />
                </TableCell>
                <TableCell>
                  <SelectField
                    fieldName={`remarks.${idx}.penality`}
                    data={PENALITY}
                    disabled={isObserver}
                  />
                </TableCell>
                <TableCell>
                  <SelectField
                    fieldName={`remarks.${idx}.reason`}
                    data={REASON.map((reason) => t(reason) as string)}
                    disabled={isObserver}
                  />
                </TableCell>
                <TableCell>
                  <AddRemoveFieldsButton
                    formField={remarks}
                    defaultValues={defaultRemarks}
                    index={idx}
                    disabled={isObserver}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <SendResetButton resetForm={resetForm} />
      </form>
    </Form>
  );
}
