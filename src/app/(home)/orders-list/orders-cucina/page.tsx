import { OrderListCucine } from "@/features/orderListBar/OrderListCucine";
import { OrderListForm } from "@/features/orderListBar/OrderListForm";

const Page = () => {
  return <OrderListForm children={<OrderListCucine />} />;
};
export default Page;
