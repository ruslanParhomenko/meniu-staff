"use client";
import ReportCucinaForm from "@/features/report/cucina/ReportCucinaForm";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";
const Page = () => {
  const { isAdmin, isCucina, isUser } = useAbility();

  return isAdmin || isCucina || isUser ? (
    <ReportCucinaForm />
  ) : (
    <InsufficientRights />
  );
};
export default Page;
