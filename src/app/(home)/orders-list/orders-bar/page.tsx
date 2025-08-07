import { OrderListBar } from "@/features/orderListBar/OrderListBar";
import { OrderListForm } from "@/features/orderListBar/OrderListForm";

const Page = () => {
  return (
    <OrderListForm>
      <OrderListBar />
    </OrderListForm>
  );
};

export default Page;
