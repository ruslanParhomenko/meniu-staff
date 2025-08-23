import { OrderListTTNBar } from "@/features/order-list/orderListBarTTN";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <OrderListTelegramForm user="barTTN" url="ttn">
      <OrderListTTNBar />
    </OrderListTelegramForm>
  );
};

export default Page;
