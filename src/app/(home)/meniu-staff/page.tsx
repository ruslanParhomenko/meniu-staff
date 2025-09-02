"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeniuData } from "@/hooks/useDataMeniuData";
import { useTranslations } from "next-intl";

export default function MeniuStaff() {
  const t = useTranslations("Staff");
  const { data, isLoading } = useMeniuData();
  const dataStaff = data && data.staff;
  if (isLoading) return null;
  console.log(dataStaff);
  return (
    <div className="h-[100vh] my-18  flex flex-col items-center">
      <div className="border border-solid rounded-2xl w-full flex flex-col items-center justify-center my-2 ">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Monday"
        >
          <AccordionItem value="Monday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Monday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.monday?.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full border-b py-2 px-4"
                >
                  {/* Название блюда слева */}
                  <span className="text-center flex-1">{item}</span>

                  {/* Select для оценки справа */}
                  <Select defaultValue="0">
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ⭐</SelectItem>
                      <SelectItem value="2">2 ⭐</SelectItem>
                      <SelectItem value="3">3 ⭐</SelectItem>
                      <SelectItem value="4">4 ⭐</SelectItem>
                      <SelectItem value="5">5 ⭐</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="rounded-3xl border border-solid border-transparent bg-white text-center text-3xl font-bold   flex items-center justify-center text-background gap-4 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150 px-5 mt-10">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Monday"
        >
          <AccordionItem value="Tuesday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Tuesday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.tuesday?.map((item: string, index: number) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border border-solid rounded-2xl w-full flex flex-col items-center justify-center my-2">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Wednesday"
        >
          <AccordionItem value="Tuesday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Wednesday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.wednesday?.map((item: string, index: number) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border border-solid rounded-2xl w-full flex flex-col items-center justify-center my-2">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Monday"
        >
          <AccordionItem value="Monday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Thursday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.thursday?.map((item: string, index: number) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border border-solid rounded-2xl w-full flex flex-col items-center justify-center my-2">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Friday"
        >
          <AccordionItem value="Friday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Friday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.friday?.map((item: string, index: number) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border border-solid rounded-2xl w-full flex flex-col items-center justify-center my-2">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Saturday"
        >
          <AccordionItem value="Saturday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Saturday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.saturday?.map((item: string, index: number) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border border-solid rounded-2xl w-full flex flex-col items-center justify-center my-2">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="Sunday"
        >
          <AccordionItem value="Sunday">
            <AccordionTrigger className="text-lg text-center cursor-pointer w-full [&>svg]:hidden   no-underline! focus:no-underline">
              <p className="flex justify-center w-full">{t("Sunday")}</p>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {dataStaff?.sunday?.map((item: string, index: number) => (
                <p key={index} className="text-sm">
                  {item}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
