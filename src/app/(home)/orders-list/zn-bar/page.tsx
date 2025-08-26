"use client";
import { OrderListBar } from "@/features/order-list/OrderListBarZN";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  const { isAdmin, isBar } = useAbility();
  return isAdmin || isBar ? (
    <OrderListTelegramForm user="barZN" url="zn">
      <OrderListBar />
    </OrderListTelegramForm>
  ) : (
    <InsufficientRights />
  );
};

export default Page;
