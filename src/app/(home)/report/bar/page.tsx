"use client";
import { ReportBarForm } from "@/features/report/bar/ReportBarForm";
import { InsufficientRights } from "@/features/ui/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isBar } = useAbility();

  return isAdmin || isBar ? <ReportBarForm /> : <InsufficientRights />;
};
export default Page;
