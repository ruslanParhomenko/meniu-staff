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

  const skeletonItems = Array(4).fill(""); // количество полос-заглушек

  return (
    <div className="rounded-xl w-full shadow-xs my-auto flex items-center justify-center bg-foreground text-background">
      <Accordion
        type="single"
        value={openAccordion}
        onValueChange={setOpenAccordion}
        collapsible
        className="w-full px-4"
      >
        <AccordionItem value={nameTag}>
          <AccordionTrigger
            className="cursor-pointer px-4 no-underline focus:no-underline flex items-center justify-center gap-3 [&>svg]:hidden hover:no-underline"
            onClick={handleAccordionToggle}
          >
            <Label
              className={`text-xl ${isOpen ? "font-bold" : "opacity-60"}`}
              {...register(nameTag)}
            >
              {t(nameTag)}
            </Label>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-2 pt-2 pb-4">
              {dataStaff?.[nameTag]
                ? dataStaff[nameTag].map((item: string, index: number) => (
                    <div
                      key={index}
                      className="grid grid-cols-[58%_40%] items-center"
                    >
                      <input
                        type="hidden"
                        value={item}
                        {...register(`${nameTag}.${index}.item`)}
                      />
                      <span className="text-base text-left">{item}</span>
                      <RatingDots name={`${nameTag}.${index}.rating`} />
                    </div>
                  ))
                : skeletonItems.map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[58%_40%] items-center gap-2 animate-pulse"
                    >
                      <div className="h-5 bg-background/30 rounded w-full"></div>
                      <div className="h-5 bg-background/30 rounded w-full"></div>
                    </div>
                  ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
