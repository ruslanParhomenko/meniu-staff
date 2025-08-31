import { Button } from "@/components/ui/button";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";

export const DeleteListButton = ({
  data,
  deleteMutation,
}: {
  data: { id: number; date: string };
  deleteMutation: () => void;
}) => {
  const { isAdmin } = useAbility();
  const t = useTranslations("Home");
  return (
    <div className="flex w-full justify-between items-center p-4 pt-4">
      <div className="text-lg font-semibold">
        {new Date(data?.date).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
      <Button
        type="button"
        variant={"default"}
        onClick={() => deleteMutation()}
        disabled={!isAdmin}
      >
        {t("delete")}
      </Button>
    </div>
  );
};
