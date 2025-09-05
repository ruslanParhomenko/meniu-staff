"use client";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSendTelegram } from "@/hooks/use-send-telegram";

import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { RotateCcw, Send, SendHorizonal } from "lucide-react";

export const OrderListTelegramForm = ({
  user,
  openAccordion,
  setOpenAccordion,
}: {
  user: string;
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
}) => {
  const t = useTranslations("Staff");
  const STORAGE_KEY = "notes";
  const defaultValues = {
    notes: "",
  };

  const { sendTelegramMessage } = useSendTelegram();
  const { getValue, setValue, removeValue } =
    useLocalStorageForm<any>(STORAGE_KEY);
  const form = useForm<any>({
    defaultValues: {
      ...defaultValues,
      ...getValue(),
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setValue(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setValue]);
  const resetForm = () => {
    form.reset(defaultValues);
    removeValue();
  };

  const sendTextTelegram: SubmitHandler<any> = async (data) => {
    sendTelegramMessage(data, "api/send-telegram", user);
  };
  const isOpen = openAccordion === "feedback";
  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion("feedback");
  };

  return (
    <div className="rounded-xl w-full shadow-xs my-auto flex items-center justify-center bg-foreground text-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendTextTelegram)}
          id="telegram-form"
          className="w-full px-4"
        >
          <Accordion
            type="single"
            value={openAccordion}
            onValueChange={setOpenAccordion}
            collapsible
            className="w-full"
          >
            <AccordionItem value="feedback">
              <AccordionTrigger
                className="cursor-pointer px-4 no-underline focus:no-underline flex items-center justify-center gap-2 [&>svg]:hidden hover:no-underline"
                onClick={handleAccordionToggle}
              >
                <Label
                  className={`text-xl ${isOpen ? "font-bold" : "opacity-60"}`}
                >
                  {t("feedback")}
                </Label>
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Textarea
                    placeholder="notes ..."
                    {...form.register("notes")}
                  />
                  <div className="flex gap-4 w-full justify-end items-center px-4 ">
                    <button className="w-12" type="submit">
                      <SendHorizonal className="mx-auto text-background" />
                    </button>
                    <button className="w-12" type="button" onClick={resetForm}>
                      <RotateCcw className="mx-auto text-background" />
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
};
