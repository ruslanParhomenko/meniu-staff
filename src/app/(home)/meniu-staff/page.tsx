"use client";
import LanguageSwitcher from "@/components/switches/LanguageSwitch";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import MeniuStaffTable from "@/components/meniu/MeniuStaffTable";
import { getCurrentDay } from "@/utils/getCurrentDay";
import { useState, useEffect } from "react";

export default function MeniuStaff() {
  const { data } = useMeniuData();
  const dataStaff = data && data.staff;

  const [openAccordion, setOpenAccordion] = useState("");

  useEffect(() => {
    setOpenAccordion(getCurrentDay());
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center pt-15 pb-10 px-4">
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="monday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="tuesday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="wednesday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="thursday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="friday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="saturday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <MeniuStaffTable
        dataStaff={dataStaff}
        nameTag="sunday"
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
      <div className="flex flex-row w-full items-center justify-around px-4 pt-2 gap-2 mt-auto">
        <button
          className="cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="rotate-180 text-foreground" />
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
