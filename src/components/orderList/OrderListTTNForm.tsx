"use client";
import { useForm, useWatch } from "react-hook-form";
import { Form } from "../ui/form";
import { AQUA_TRADE, QUANTITY_SELECT } from "./constants";
import SelectInput from "../selector/SelectInput";

const OrderListTTNForm = () => {
  const form = useForm({});
  return (
    <Form {...form}>
      <form>
        {AQUA_TRADE.map((item, index) => {
          const fieldName = item;
          // const selectedValue = useWatch({ name: fieldName });
          return (
            <div key={index} className="w-80">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
                // disabled={selectedValue === ""}
              />
            </div>
          );
        })}
      </form>
    </Form>
  );
};

export default OrderListTTNForm;
