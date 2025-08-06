"use client";
import { useForm } from "react-hook-form";
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
          return (
            <div key={index} className="w-80">
              <SelectInput
                fieldName={item}
                fieldLabel={item}
                data={QUANTITY_SELECT}
              />
            </div>
          );
        })}
      </form>
    </Form>
  );
};

export default OrderListTTNForm;
