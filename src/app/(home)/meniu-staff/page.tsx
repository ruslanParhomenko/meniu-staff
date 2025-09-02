"use client";
import LanguageSwitcher from "@/components/switches/LanguageSwitch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils"; 
import { RatingDots } from "@/utils/ratingDots";

export default function MeniuStaff() {
  const t = useTranslations("Staff");

  const [rating, setRating] = useState<number>(0);
  const { data, isLoading } = useMeniuData();
  const dataStaff = data && data.staff;
  if (isLoading) return null;
  console.log(dataStaff);
  return (
    <div className="min-h-screen  flex flex-col items-center pt-15 pb-5 px-4">
      
      <div className="rounded-3xl border w-full  border-solid border-transparent bg-white text-center text-3xl font-bold   flex items-center justify-center  gap-6 shadow-lg   transition-all duration-350 px-5 mt-5">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="tuesday"
        >
          <AccordionItem value="tuesday">
            <AccordionTrigger className=" text-center justify-center cursor-pointer px-12  [&>svg]:hidden   no-underline! focus:no-underline">
              <Label className="text-3xl font-bold text-space-x-2"  >
                
                <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
              {t("Tuesday")}
                <Image src="../dot.svg" width={16} height={16} priority alt="dot" />
              </Label>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
            {dataStaff?.tuesday?.map((item: string, index: number) => (
  <div key={index} className="grid grid-cols-2 justify-between items-center">
    <p className="text-xl font-bold">{item}</p>
    <RatingDots />
  </div>
))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
     
      <div className="flex flex-row w-full items-center justify-around px-4 gap-2 mt-auto">


      <button className="cursor-pointer"  onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="rotate-180 text-bl" />
            
      </button>
            <LanguageSwitcher />
      </div>


    </div>
  );
}
