import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { Label } from "../../components/ui/label";
import { RatingDots } from "@/utils/ratingDots";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
export default function MeniuStaffTable({
  dataStaff,
  nameTag,
  openAccordion,
  setOpenAccordion,
}: {
  dataStaff: any;
  nameTag: string;
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
}) {
  const t = useTranslations("Staff");
  const isOpen = openAccordion === nameTag;
  const form = useFormContext();
  const { register } = form;
  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion(nameTag);
  };
  const skeletonItems = Array(4).fill("");

  const [delayedOpen, setDelayedOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDelayedOpen(false);
      const timer = setTimeout(() => setDelayedOpen(true), 700);
      return () => clearTimeout(timer);
    } else {
      setDelayedOpen(false);
    }
  }, [isOpen]);
  return (
    <div className="w-full my-auto flex items-center justify-cente">
      <Accordion
        type="single"
        value={openAccordion}
        onValueChange={setOpenAccordion}
        collapsible
        className="w-full px-2 border-none"
      >
        <AccordionItem
          value={nameTag}
          className={`border rounded-md border-white transition-colors duration-500 ${
            isOpen ? "bg-white text-black" : "bg-transparent"
          }`}
        >
          <AccordionTrigger
            className="cursor-pointer px-2 flex items-center justify-between hover:no-underline [&>svg]:font-bold [&>svg]:hidden"
            onClick={handleAccordionToggle}
          >
            <Label
              className={`text-xl transition-colors duration-500 ${
                isOpen ? "font-bold" : "text-white"
              }`}
              {...register(nameTag)}
            >
              {t(nameTag)}
            </Label>
          </AccordionTrigger>

          <AccordionContent
            className={cn(
              "overflow-hidden transition-all duration-600 ease-in-out px-0"
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-3 py-2 transition-all duration-600 ease-in-out",
                delayedOpen ? "px-4" : ""
              )}
            >
              {dataStaff?.[nameTag]
                ? dataStaff[nameTag].map((item: string, index: number) => (
                    <div
                      key={index}
                      className="grid grid-cols-[57%_43%] items-center animate-fadeIn"
                    >
                      <input
                        type="hidden"
                        value={item}
                        {...register(`${nameTag}.${index}.item`)}
                      />
                      <span className="text-md text-left font-bold">
                        {item}
                      </span>
                      {item && (
                        <RatingDots name={`${nameTag}.${index}.rating`} />
                      )}
                    </div>
                  ))
                : skeletonItems.map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[58%_40%] items-center gap-2 animate-pulse"
                    >
                      <div className="h-5 bg-black rounded w-full"></div>
                      <div className="h-5 bg-black rounded w-full"></div>
                    </div>
                  ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
