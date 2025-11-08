"use client";
import { useSession } from "next-auth/react";
import MeniuStaffTable from "@/features/meniu-staff/MeniuStaffTable";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { useState, useEffect, useRef } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { FormValues } from "./schema";
import FooterButton from "@/components/buttons/FooterButton";

export default function MeniuStaffForm({ data }: { data: any }) {
  const LOCAL_STORAGE_KEY = "meniu-staff";

  //localstorage
  const { getValue, setValue: setLocalStorage } =
    useLocalStorageForm<any>(LOCAL_STORAGE_KEY);

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

  const [openAccordion, setOpenAccordion] = useState("");
  useEffect(() => {
    setLocalStorage({
      ...dataStaff,
      [currentDay]: watchAllFields?.[currentDay],
    });
  }, [watchAllFields]);

  useEffect(() => {
    setOpenAccordion(getCurrentDay());
  }, []);
  if (session.status === "loading") return null;
  return (
    <div className="h-full flex flex-col items-center py-2  mx-auto  max-w-[500px] bg-black/80">
      <Form {...form}>
        <form
          id="menuForm"
          onSubmit={form.handleSubmit(() => {})}
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

      <FooterButton
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
        nameTag={"feedback"}
      />
    </div>
  );
}
