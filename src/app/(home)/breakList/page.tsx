"use client";
import { BreakList } from "@/features/breakList/BreakListForm";
import { InsufficientRights } from "@/features/ui/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isBar } = useAbility();
  return isAdmin || isBar ? <BreakList /> : <InsufficientRights />;
};
export default Page;
