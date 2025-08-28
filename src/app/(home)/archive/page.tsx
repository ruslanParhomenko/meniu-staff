"use client";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { ArchiveForm } from "@/features/archive/ArchiveForm";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isObserver } = useAbility();
  return isObserver ? <InsufficientRights /> : <ArchiveForm />;
};

export default Page;
