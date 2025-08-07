import { OrderListBar } from "@/features/orderListBar/OrderListBar";
import { OrderListForm } from "@/features/orderListBar/OrderListForm";

const Page = () => {
  return <OrderListForm children={<OrderListBar />} />;
};
export default Page;
