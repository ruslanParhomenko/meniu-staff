import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function SendResetButton({ resetForm }: { resetForm: () => void }) {
  const t = useTranslations("UI");
  return (
    <div className="flex justify-start items-center p-5 pt-5 gap-4">
      <Button type="submit" variant={"default"} className="hover:bg-blue-600">
        {t("send")}
      </Button>
      <Button
        type="button"
        variant={"secondary"}
        onClick={resetForm}
        className="hover:bg-red-600"
      >
        {t("reset")}
      </Button>
    </div>
  );
}
