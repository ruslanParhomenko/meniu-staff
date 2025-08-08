import { OrderListTTNCucine } from "@/features/orderListTTN/orderListTtnCucina";

import { OrderListTTNForm } from "@/features/orderListTTN/OrderListTTNForm";

const Page = () => {
  return (
    <OrderListTTNForm>
      <OrderListTTNCucine />
    </OrderListTTNForm>
  );
};

export default Page;
