"use client";
import LanguageSwitcher from "@/components/switches/LanguageSwitch";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import MeniuStaffTable from "@/features/meniu-staff/MeniuStaffTable";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { useState, useEffect } from "react";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function MeniuStaffForm() {
  const { data } = useMeniuData();
  const dataStaff = data && data.staff;
  const session = useSession();
  const user = session.data?.user?.name;

  const form = useForm();
  const { register } = form;

  const [openAccordion, setOpenAccordion] = useState("");

  useEffect(() => {
    setOpenAccordion(getCurrentDay());
  }, []);

  if (session.status === "loading") return null;

  return (
    <div className="min-h-screen flex flex-col items-center pt-15 pb-15 px-1">
      <Form {...form}>
        <form
          id="menuForm"
          onSubmit={form.handleSubmit((formData) => {
            console.log("Form submit:", formData);
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

          <input type="hidden" value={user!} {...register("user")} />
        </form>
      </Form>
      <div className="flex flex-row w-full items-center justify-around px-4 pt-2 gap-2 mt-auto">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="rotate-180 text-foreground" />
        </button>

        <button type="submit" className="px-4 py-2  rounded" form="menuForm">
          Send
        </button>

        <LanguageSwitcher />
      </div>
    </div>
  );
}
