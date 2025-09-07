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
import { useTranslations } from "next-intl";
import { RotateCcw, SendHorizonal } from "lucide-react";
import { useSession } from "next-auth/react";

export const OrderListTelegramForm = ({
  openAccordion,
  setOpenAccordion,
}: {
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
}) => {
  const session = useSession();
  const user = session.data?.user?.name;
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
    sendTelegramMessage(data, "api/send-telegram", user!);
  };
  const isOpen = openAccordion === "feedback";
  const handleAccordionToggle = () => {
    if (isOpen) setOpenAccordion("");
    else setOpenAccordion("feedback");
  };

  return (
    <div className="w-full my-auto flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendTextTelegram)}
          id="telegram-form"
          className="w-full"
        >
          <Accordion
            type="single"
            value={openAccordion}
            onValueChange={setOpenAccordion}
            collapsible
            className="w-full px-2 border-none"
          >
            <AccordionItem
              value="feedback"
              className={`border rounded-md border-foreground transition-all duration-500 overflow-hidden
  ${
    isOpen
      ? "bg-foreground text-background opacity-100 max-h-[1000px]"
      : "bg-transparent opacity-0 max-h-0"
  }`}
            >
              <AccordionTrigger
                className="cursor-pointer  px-4 no-underline focus:no-underline flex items-center justify-center gap-2 [&>svg]:hidden hover:no-underline"
                onClick={handleAccordionToggle}
              ></AccordionTrigger>

              <AccordionContent className="px-1.5">
                <div className="flex flex-col">
                  <Textarea
                    placeholder="notes ..."
                    {...form.register("notes")}
                    className="resize-none"
                  />
                  <div className="flex gap-4 w-full justify-end items-center pt-2">
                    <button className="w-12" type="submit">
                      <SendHorizonal className="mx-auto text-gr" />
                    </button>
                    <button className="w-12" type="button" onClick={resetForm}>
                      <RotateCcw className="mx-auto text-gr" />
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
