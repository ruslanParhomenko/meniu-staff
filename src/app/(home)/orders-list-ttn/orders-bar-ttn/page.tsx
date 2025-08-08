import { OrderListBar } from "@/features/orderListBar/OrderListBar";

import { OrderListTTNForm } from "@/features/orderListTTN/OrderListTTNForm";

const Page = () => {
  return (
    <OrderListTTNForm>
      <OrderListBar />
    </OrderListTTNForm>
  );
};

export default Page;
