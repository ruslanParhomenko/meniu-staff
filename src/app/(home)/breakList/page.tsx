"use client";

import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import BreakList from "@/features/breakList/BreakListForm";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isBar, isUser } = useAbility();
  return isAdmin || isBar || isUser ? <BreakList /> : <InsufficientRights />;
};
export default Page;
