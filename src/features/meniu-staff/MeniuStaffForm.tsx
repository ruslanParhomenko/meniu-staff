"use client";
import { useSession } from "next-auth/react";
import MeniuStaffTable from "@/features/meniu-staff/MeniuStaffTable";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { useState, useEffect, useRef } from "react";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { useDataSupaBase } from "@/hooks/useRealTimeData";
import Footer from "@/components/footer/Footer";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";
import toast from "react-hot-toast";

interface FormValues {
  user?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  [key: string]: any;
}

export default function MeniuStaffForm() {
  const { data } = useMeniuData();
  const LOCAL_STORAGE_KEY = "meniu-staff";
  //localstorage
  const { getValue, setValue: setLocalStorage } =
    useLocalStorageForm<any>(LOCAL_STORAGE_KEY);

  //realtime
  const { sendRealTime, fetchRealTime } = useDataSupaBase({
    localStorageKey: LOCAL_STORAGE_KEY,
    apiKey: "meniu-staff",
  });
  const dataStaff = data && data.staff;
  const session = useSession();
  const user = session.data?.user?.name;
  const form = useForm<FormValues>({
    defaultValues: {
      ...dataStaff,
      ...getValue(),
    },
    mode: "onBlur",
  });
  const { register } = form;
  const watchAllFields: FormValues = form.watch();
  const currentDay = getCurrentDay();
  const currentDayValue: FormValues = useWatch({
    control: form.control,
    name: currentDay,
  });
  //set locale supaBase
  const sendCountRef = useRef(0);
  const [lastDay, setLastDay] = useState(currentDay);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(`sendCount-${currentDay}`);
    sendCountRef.current = saved ? Number(saved) : 0;
  }, [currentDay]);
  useEffect(() => {
    if (currentDay !== lastDay) {
      sendCountRef.current = 0;
      setLastDay(currentDay);
      if (typeof window !== "undefined") {
        localStorage.setItem(`sendCount-${currentDay}`, "0");
      }
    }
  }, [currentDay, lastDay]);
  useEffect(() => {
    if (!currentDayValue || !user) return;
    const hasRating = Array.isArray(currentDayValue)
      ? currentDayValue.some((item) => item.rating)
      : !!currentDayValue?.rating;

    if (!hasRating) return;

    if (sendCountRef.current >= 6) {
      // toast.error("Лимит отправок достигнут для текущего дня");
      return;
    }
    const timeout = setTimeout(() => {
      const dataToSend = {
        user: watchAllFields?.user,
        [currentDay]: Array.isArray(currentDayValue)
          ? currentDayValue.filter((item) => item.rating)
          : currentDayValue,
        date: new Date().toISOString(),
      };

      sendRealTime(dataToSend);
      toast.success("Данные отправлены");
      sendCountRef.current += 1;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `sendCount-${currentDay}`,
          String(sendCountRef.current)
        );
      }
    }, 10000);
    return () => clearTimeout(timeout);
  }, [currentDayValue, user, currentDay]);
  const [openAccordion, setOpenAccordion] = useState("");
  useEffect(() => {
    setLocalStorage({
      ...dataStaff,
      [currentDay]: watchAllFields?.[currentDay],
    });
  }, [watchAllFields]);
  const otherFields = useWatch({
    control: form.control,
    name: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ].filter((day) => day !== currentDay),
  });
  const prevOtherFieldsRef = useRef(otherFields);

  useEffect(() => {
    if (!prevOtherFieldsRef.current) {
      prevOtherFieldsRef.current = otherFields;
      return;
    }
    const changed = otherFields.some(
      (val, i) => val !== prevOtherFieldsRef.current[i]
    );
    if (changed) {
      toast.error("Оценка применяется только к текущему дню", {
        duration: 3000,
      });
    }
    prevOtherFieldsRef.current = [...otherFields];
  }, [otherFields]);

  useEffect(() => {
    setOpenAccordion(getCurrentDay());
  }, []);
  if (session.status === "loading") return null;
  return (
    <div className="h-full flex flex-col items-center py-2">
      <Form {...form}>
        <form
          id="menuForm"
          onSubmit={form.handleSubmit((formData) => {})}
          className="w-full flex flex-col flex-1"
        >
          {user ? (
            <>
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => (
                <MeniuStaffTable
                  key={day}
                  dataStaff={dataStaff}
                  nameTag={day}
                  openAccordion={openAccordion}
                  setOpenAccordion={setOpenAccordion}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col flex-1 items-center justify-center">
              <h1 className="text-xl font-bold">необходимо авторизоваться</h1>
            </div>
          )}
          {user && <input type="hidden" value={user} {...register("user")} />}
        </form>
      </Form>

      <Footer />
    </div>
  );
}
