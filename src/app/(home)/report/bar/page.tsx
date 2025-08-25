"use client";
import { ReportBarForm } from "@/features/report/bar/ReportBarForm";
import { InsufficientRights } from "@/features/ui/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isBar } = useAbility();

  if (!isAdmin && !isBar) return null;
  return isAdmin || isBar ? <ReportBarForm /> : <InsufficientRights />;
};
export default Page;
