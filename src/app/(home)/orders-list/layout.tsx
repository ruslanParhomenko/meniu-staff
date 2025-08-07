import OrderNav from "@/features/navigation/OrderNavigasion";

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrderNav />
      {children}
    </>
  );
};

export default OrderLayout;
