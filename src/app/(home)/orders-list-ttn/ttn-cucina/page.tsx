import { OrderListTTNCucine } from "@/features/order-list/orderListCucinaTTN";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  return (
    <OrderListTelegramForm user="cucinaTTN">
      <OrderListTTNCucine />
    </OrderListTelegramForm>
  );
};

export default Page;
