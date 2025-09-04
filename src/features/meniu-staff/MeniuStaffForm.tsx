"use client";
import { useSession } from "next-auth/react";
import MeniuStaffTable from "@/features/meniu-staff/MeniuStaffTable";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { useState, useEffect } from "react";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { useDataSupaBase } from "@/hooks/useRealTimeData";
import Footer from "@/components/Footer/Footer";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

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
  const {
    getValue,
    setValue: setLocalStorage,
    removeValue,
  } = useLocalStorageForm<any>(LOCAL_STORAGE_KEY);

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
  //set locale supaBase
  useEffect(() => {
    if (!watchAllFields) return;
    setLocalStorage(watchAllFields);
    if (!user) return;
    const timeout = setTimeout(() => {
      const currentDay = getCurrentDay();
      if (!watchAllFields?.[currentDay] || !user) return;
      const dataToSend = {
        user: watchAllFields?.user,
        [currentDay]: watchAllFields?.[currentDay],
        date: new Date().toISOString(),
      };

      sendRealTime({ ...dataToSend });
    }, 60000);
    return () => clearTimeout(timeout);
  }, [watchAllFields]);

  const [openAccordion, setOpenAccordion] = useState("");

  useEffect(() => {
    setOpenAccordion(getCurrentDay());
  }, []);

  // useEffect(() => {
  //   if (user && dataStaff) {
  //     form.reset({
  //       ...dataStaff,
  //       ...getValue(),
  //       user: user,
  //     });
  //   }
  // }, [user, dataStaff, form.reset]);
  if (session.status === "loading") return null;
  return (
    <div className="h-full flex flex-col items-center pt-8 pb-8 px-1">
      <Form {...form}>
        <form
          id="menuForm"
          onSubmit={form.handleSubmit((formData) => {
            // console.log("Form submit:", formData);
          })}
          className="w-full flex flex-col flex-1"
        >
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

          {user && <input type="hidden" value={user} {...register("user")} />}
        </form>
      </Form>
      <OrderListTelegramForm
        user={user || ""}
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      {/* <button onClick={fetchRealTime}>fetch</button> */}
      <Footer />
    </div>
  );
}
