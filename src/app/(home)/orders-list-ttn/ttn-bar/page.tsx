"use client";
import { OrderListTTNBar } from "@/features/order-list/orderListBarTTN";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  const { isAdmin, isBar } = useAbility();

  return (
    <>
      {isAdmin || isBar ? (
        <OrderListTelegramForm user="barTTN" url="ttn">
          <OrderListTTNBar />
        </OrderListTelegramForm>
      ) : (
        <InsufficientRights />
      )}
    </>
  );
};

export default Page;
