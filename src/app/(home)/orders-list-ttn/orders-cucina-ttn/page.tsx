import { OrderListCucine } from "@/features/orderListBar/OrderListCucine";

import { OrderListTTNForm } from "@/features/orderListTTN/OrderListTTNForm";

const Page = () => {
  return (
    <OrderListTTNForm>
      <OrderListCucine />
    </OrderListTTNForm>
  );
};

export default Page;
