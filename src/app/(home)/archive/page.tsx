"use client";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { ArhiveForm } from "@/features/arhive/ArhiveForm";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isObserver } = useAbility();
  return isObserver ? <InsufficientRights /> : <ArhiveForm />;
};

export default Page;
