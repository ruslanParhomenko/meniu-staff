import { OrderListCucine } from "@/features/order-list/OrderListCucineZN";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  return (
    <OrderListTelegramForm user="cucinaZN">
      <OrderListCucine />
    </OrderListTelegramForm>
  );
};

export default Page;
