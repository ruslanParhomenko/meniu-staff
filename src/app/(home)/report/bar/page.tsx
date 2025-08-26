"use client";
import { ReportBarForm } from "@/features/report/bar/ReportBarForm";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin, isBar, isUser } = useAbility();

  return isAdmin || isBar || isUser ? (
    <ReportBarForm />
  ) : (
    <InsufficientRights />
  );
};
export default Page;
