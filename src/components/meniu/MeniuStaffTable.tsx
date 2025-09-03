import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";
import { RatingDots } from "@/utils/ratingDots";

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

  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion(nameTag);
  };

  if (!dataStaff) return null;

  return (
    <div className="rounded-3xl w-full shadow-xs mt-4 flex items-center justify-center bg-foreground text-background">
      <Accordion
        type="single"
        value={openAccordion}
        onValueChange={setOpenAccordion}
        collapsible
        className="w-full px-4"
      >
        <AccordionItem value={nameTag}>
          <AccordionTrigger
            className="cursor-pointer px-4 no-underline focus:no-underline flex items-center justify-center gap-3 [&>svg]:hidden"
            onClick={handleAccordionToggle}
          >
            <Label className={`text-xl ${isOpen ? "font-bold" : "opacity-60"}`}>
              {t(nameTag)}
            </Label>
          </AccordionTrigger>

          <div
            className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
            style={{
              maxHeight: isOpen
                ? `${dataStaff?.[nameTag]?.length * 50}px`
                : "0px",
            }}
          >
            <div className="flex flex-col gap-2 py-2">
              {dataStaff?.[nameTag]?.map((item: string, index: number) => (
                <div key={index} className="grid grid-cols-[60%_40%]">
                  <span className="text-base text-left">{item}</span>
                  <RatingDots />
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
