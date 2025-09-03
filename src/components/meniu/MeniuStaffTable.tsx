import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import Image from "next/image";
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
    if (isOpen) {
      setOpenAccordion("");
    } else {
      setOpenAccordion(nameTag);
    }
  };

  return (
    <div className="rounded-3xl w-full shadow-xs mt-5  flex items-center justify-center bg-foreground text-background">
      <Accordion
        type="single"
        value={openAccordion}
        onValueChange={setOpenAccordion}
        collapsible
        className="w-full px-4"
      >
        <AccordionItem value={nameTag}>
          <AccordionTrigger
            className="justify-center cursor-pointer px-12 [&>svg]:hidden no-underline! focus:no-underline"
            onClick={handleAccordionToggle}
          >
            <Label className="text-xl text-space-x-2">
              <Image
                src="../dot.svg"
                width={20}
                height={20}
                priority
                alt="dot"
              />
              {t(nameTag)}
              <Image
                src="../dot.svg"
                width={20}
                height={20}
                priority
                alt="dot"
              />
            </Label>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {dataStaff?.[nameTag]?.map((item: string, index: number) => (
              <div key={index} className="grid grid-cols-[60%_40%]">
                <span className="text-base text-left">{item}</span>
                <RatingDots />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
