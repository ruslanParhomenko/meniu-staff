import { Button } from "@/components/ui/button";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";

export function SendResetButton({ resetForm }: { resetForm: () => void }) {
  const { isObserver } = useAbility();
  const t = useTranslations("UI");
  return (
    <div className="flex justify-start items-center p-5 pt-5 gap-30 md:gap-5">
      <Button
        type="submit"
        variant={"default"}
        className="hover:bg-blue-600"
        disabled={isObserver}
      >
        {t("send")}
      </Button>
      <Button
        type="button"
        variant={"secondary"}
        onClick={resetForm}
        className="hover:bg-red-600"
        disabled={isObserver}
      >
        {t("reset")}
      </Button>
    </div>
  );
}
