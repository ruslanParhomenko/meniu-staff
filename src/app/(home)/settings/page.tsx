"use client";
import SettingsForm from "@/features/settings/SettingsForm";
import { InsufficientRights } from "@/components/wrapper/InsufficientRights";
import { useAbility } from "@/providers/AbilityProvider";

const Page = () => {
  const { isAdmin } = useAbility();
  return isAdmin ? <SettingsForm /> : <InsufficientRights />;
};

export default Page;
