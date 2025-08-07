"use client";
import { useForm } from "react-hook-form";

import { AQUA_TRADE, QUANTITY_SELECT } from "./constants";
import { Form } from "@/components/ui/form";
import SelectInput from "@/components/inputs/SelectInput";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const OrderListTTNForm = () => {
  const t = useTranslations("UI");
  const form = useForm({});
  return (
    <Form {...form}>
      <form>
        {AQUA_TRADE.map((item, index) => {
          return (
            <div key={index} className="w-80 ">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
              <Separator className="my-1" />
            </div>
          );
        })}
        <div className="flex justify-start items-center p-5 pt-20">
          <Button type="submit" variant={"default"}>
            {t("send")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderListTTNForm;
