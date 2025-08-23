import { OrderListTTNCucine } from "@/features/order-list/orderListCucinaTTN";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <OrderListTelegramForm user="cucinaTTN" url="ttn">
      <OrderListTTNCucine />
    </OrderListTelegramForm>
  );
};

export default Page;
