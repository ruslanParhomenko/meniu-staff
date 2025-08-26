"use client";
import { BreakList } from "@/features/breakList/BreakListForm";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isBar, isUser } = useAbility();
  return isAdmin || isBar || isUser ? <BreakList /> : <InsufficientRights />;
};
export default Page;
