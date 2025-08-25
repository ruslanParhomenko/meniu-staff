"use client";
import ReportCucinaForm from "@/features/report/cucina/ReportCucinaForm";
import { InsufficientRights } from "@/features/ui/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";
const Page = () => {
  const { isAdmin, isCucina } = useAbility();

  return isAdmin || isCucina ? <ReportCucinaForm /> : <InsufficientRights />;
};
export default Page;
