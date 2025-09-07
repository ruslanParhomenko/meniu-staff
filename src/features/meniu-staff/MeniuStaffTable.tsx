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
  const skeletonItems = Array(4).fill("");
  return (
    <div className="w-full my-auto flex items-center justify-center text-foreground">
      <Accordion
        type="single"
        value={openAccordion}
        onValueChange={setOpenAccordion}
        collapsible
        className="w-full px-2"
      >
        <AccordionItem value={nameTag}>
          <AccordionItem value={nameTag}>
            <AccordionTrigger
              className="cursor-pointer px-4 flex items-center justify-between  hover:no-underline [&>svg]:font-bold [&>svg]:text-foreground"
              onClick={handleAccordionToggle}
            >
              <Label
                className={`text-xl ${
                  isOpen ? "font-bold text-gr" : "text-muted-foreground"
                }`}
                {...register(nameTag)}
              >
                {t(nameTag)}
              </Label>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionContent>
            <div className="flex flex-col gap-3 pt-4 texte-gr">
              {dataStaff?.[nameTag]
                ? dataStaff[nameTag].map((item: string, index: number) => (
                    <div
                      key={index}
                      className="grid grid-cols-[58%_42%] items-center"
                    >
                      <input
                        type="hidden"
                        value={item}
                        {...register(`${nameTag}.${index}.item`)}
                      />
                      <span className="text-md text-left font-bold">
                        {item}
                      </span>
                      <RatingDots name={`${nameTag}.${index}.rating`} />
                    </div>
                  ))
                : skeletonItems.map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[58%_40%] items-center gap-2 animate-pulse"
                    >
                      <div className="h-5 bg-gr/30 rounded w-full"></div>
                      <div className="h-5 bg-gr/30 rounded w-full"></div>
                    </div>
                  ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
