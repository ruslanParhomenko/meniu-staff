"use client";
import { OrderListTTNCucine } from "@/features/order-list/orderListCucinaTTN";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";
import { OrderListTelegramForm } from "@/providers/SendTelegramForm";

const Page = () => {
  const { isAdmin, isCucina } = useAbility();

  return (
    <>
      {isAdmin || isCucina ? (
        <OrderListTelegramForm user="cucinaTTN" url="ttn">
          <OrderListTTNCucine />
        </OrderListTelegramForm>
      ) : (
        <InsufficientRights />
      )}
    </>
  );
};

export default Page;
