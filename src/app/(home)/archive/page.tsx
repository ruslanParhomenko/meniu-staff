"use client";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { ArchiveForm } from "@/features/archive/ArchiveForm";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isUser, isBar, isCucina } = useAbility();
  return isAdmin || isUser || isBar || isCucina ? (
    <ArchiveForm />
  ) : (
    <InsufficientRights />
  );
};

export default Page;
