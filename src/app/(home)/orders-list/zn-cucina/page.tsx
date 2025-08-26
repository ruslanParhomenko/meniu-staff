"use client";
import { OrderListCuisine } from "@/features/order-list/OrderListCucineZN";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  const { isAdmin, isCucina } = useAbility();
  return isAdmin || isCucina ? (
    <OrderListTelegramForm user="cucinaZN" url="zn">
      <OrderListCuisine />
    </OrderListTelegramForm>
  ) : (
    <InsufficientRights />
  );
};

export default Page;
