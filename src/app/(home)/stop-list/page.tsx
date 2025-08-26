"use client";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import StopListForm from "@/features/stop-list/StopListForm";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isObserver } = useAbility();
  if (isObserver) return <InsufficientRights />;
  return <StopListForm />;
};
export default Page;
