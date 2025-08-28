import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export const InsufficientRights = () => {
  const t = useTranslations("Home");
  return (
    <div className="py-20 flex items-center justify-center">
      <Label className="text-2xl text-center text-red-600">
        {t("insufficientRights")}
      </Label>
    </div>
  );
};
