import { OrderListBar } from "@/features/order-list/OrderListBarZN";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  return (
    <OrderListTelegramForm user="barZN">
      <OrderListBar />
    </OrderListTelegramForm>
  );
};

export default Page;
