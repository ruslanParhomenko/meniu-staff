"use client";

import { useEffect, useMemo } from "react";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import toast from "react-hot-toast";

import { Form } from "../../components/ui/form";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import { SendResetButton } from "../ui/SendResetButton";

import {
  BREAK_LIST_DEFAULT,
  BreakListItem,
  INTERVAL_00,
  INTERVAL_20,
  INTERVAL_40,
  MINUTES_SELECT,
  TIME_LABELS,
} from "./constant";
import { useEmployeeSqlData } from "@/hooks/use-employee-sql";
import { useAbility } from "@/providers/AbilityProvider";
import { useSession } from "next-auth/react";
import { USER_EMAIL_FETCH_DATA } from "@/constants/emailUserFetchData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectField from "@/components/inputs/SelectField";

export type BreakListFormValues = {
  date?: Date;
  rows: BreakListItem[];
};

export const BreakListForm = () => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const { isObserver, isUser } = useAbility();
  const session = useSession();
  const LOCAL_STORAGE_KEY = "breakListFormData";
  const { employees, loading } = useEmployeeSqlData();

  const BAR_EMPLOYEES = ["waiters", "barmen"];

  const selectedEmployees = useMemo(
    () =>
      employees
        .filter((emp) => BAR_EMPLOYEES.includes(emp.position))
        .map((employee) => employee.name),
    [employees]
  );

  const savedData =
    typeof window !== "undefined"
      ? localStorage.getItem(LOCAL_STORAGE_KEY)
      : null;

  const parsedSavedData = savedData ? JSON.parse(savedData) : null;

  const form = useForm<BreakListFormValues>({
    defaultValues: parsedSavedData || {
      rows: BREAK_LIST_DEFAULT.map((item) => ({
        id: item.id,
        name: item.name,
        hours: Object.assign({}, ...item.hours),
      })),
    },
  });

  const watchAllFields = form.watch();

  useEffect(() => {
    if (!watchAllFields) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchAllFields));
    } catch (error) {}
  }, [watchAllFields]);

  const handleSubmit: SubmitHandler<BreakListFormValues> = async (data) => {
    if (!data.date) {
      toast.error("Дата не выбрана");
      return;
    }
    try {
      await fetch("/api/breakList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: data.date, rows: data.rows }),
      });
      toast.success("Брейк-лист успешно сохранён !");
    } catch (e) {
      toast.error("Ошибка при сохранении брейк-листа");
    }
  };

  const resetForm = () => {
    form.reset({
      date: new Date(),
      rows: BREAK_LIST_DEFAULT.map((item) => ({
        id: item.id,
        name: item.name,
        hours: Object.assign({}, ...item.hours),
      })),
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const fetchSupabaseData = async () => {
    try {
      const res = await fetch("/api/break-list-realtime");
      const allData = await res.json();

      const userData = allData.find(
        (item: any) => item.user_email === USER_EMAIL_FETCH_DATA
      );

      if (userData?.form_data) {
        form.reset({
          date: userData.form_data.date,
          rows: userData.form_data.rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            hours: row.hours,
          })),
        });
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(userData.form_data)
        );
      }
    } catch (err) {
      console.error("Error fetching Supabase data:", err);
    }
  };

  useEffect(() => {
    const sendDataToApi = async () => {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!localData) return;
      if (!isUser) return;

      try {
        const res = await fetch("/api/break-list-realtime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: session?.data?.user?.email,
            form_data: JSON.parse(localData),
          }),
        });

        const result = await res.json();
        if (result.error) console.error("Sync error:", result.error);
      } catch (err) {
        console.error("Request error:", err);
      }
    };

    const timeout = setTimeout(sendDataToApi, 500);
    return () => clearTimeout(timeout);
  }, [watchAllFields]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          {!isObserver && <DatePickerInput fieldName="date" />}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                {TIME_LABELS.map((h, i) => {
                  const isCurrentHour = Number(h) === currentHour;
                  return (
                    <TableHead
                      key={i}
                      className={`text-center text-xl ${
                        isCurrentHour
                          ? "text-red-600 font-bold text-xl"
                          : "text-blue-600"
                      }`}
                    >
                      {h}:
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {form.getValues("rows").map((row, rowIndex) => {
                const rowHasTrue = TIME_LABELS.some((time) => {
                  const fieldName = `rows.${rowIndex}.hours.${time}`;
                  const value = form.getValues(
                    fieldName as Path<BreakListFormValues>
                  );
                  const selectedValue = Array.isArray(value) ? value[0] : value;

                  const isCurrentHour = Number(time) === currentHour;
                  const isCurrentMinute00 = INTERVAL_00.includes(
                    currentMinute.toLocaleString()
                  );
                  const isCurrentMinute20 = INTERVAL_20.includes(
                    currentMinute.toLocaleString()
                  );
                  const isCurrentMinute40 = INTERVAL_40.includes(
                    currentMinute.toLocaleString()
                  );

                  return (
                    isCurrentHour &&
                    ((isCurrentMinute00 && selectedValue === "00") ||
                      (isCurrentMinute20 && selectedValue === "20") ||
                      (isCurrentMinute40 && selectedValue === "40"))
                  );
                });

                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      <input
                        value={row.id}
                        disabled
                        className="w-8 text-center"
                      />
                    </TableCell>

                    <TableCell
                      className={`sticky left-0 z-10 text-left bg-white/90 `}
                    >
                      <SelectField
                        fieldName={`rows[${rowIndex}].name`}
                        data={selectedEmployees}
                        disabled={isObserver}
                        className={`!min-w-[120px] ${
                          rowHasTrue
                            ? "!text-red-600 font-bold text-[18px]"
                            : ""
                        }`}
                      />
                    </TableCell>

                    {TIME_LABELS.map((time, timeIndex) => {
                      const fieldName = `rows.${rowIndex}.hours.${time}`;
                      const value = form.getValues(
                        fieldName as Path<BreakListFormValues>
                      );
                      const selectedValue = Array.isArray(value)
                        ? value[0]
                        : value;

                      const isCurrentHour = Number(time) === currentHour;
                      const isCurrentMinute00 = INTERVAL_00.includes(
                        currentMinute.toLocaleString()
                      );
                      const isCurrentMinute20 = INTERVAL_20.includes(
                        currentMinute.toLocaleString()
                      );
                      const isCurrentMinute40 = INTERVAL_40.includes(
                        currentMinute.toLocaleString()
                      );

                      const isTrue =
                        isCurrentHour &&
                        ((isCurrentMinute00 && selectedValue === "00") ||
                          (isCurrentMinute20 && selectedValue === "20") ||
                          (isCurrentMinute40 && selectedValue === "40"));

                      return (
                        <TableCell key={timeIndex}>
                          <SelectField
                            fieldName={`rows[${rowIndex}].hours.${time}`}
                            data={MINUTES_SELECT}
                            disabled={isObserver}
                            className={`${
                              isTrue ? "!text-red-600 font-bold text-xl" : ""
                            } ${
                              selectedValue === "X" ? "bg-gray-300" : "bg-white"
                            } text-center`}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
};
