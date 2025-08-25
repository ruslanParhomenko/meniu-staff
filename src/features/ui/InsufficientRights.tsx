import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export const InsufficientRights = () => {
  const tS = useTranslations("Settings");
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Label className="text-2xl text-center text-red-600">
        {tS("insufficientRights")}
      </Label>
    </div>
  );
};
