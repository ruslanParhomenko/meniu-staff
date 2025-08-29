"use client";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { ArchiveForm } from "@/features/archive/ArchiveForm";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isUser } = useAbility();
  return isAdmin || isUser ? <ArchiveForm /> : <InsufficientRights />;
};

export default Page;
