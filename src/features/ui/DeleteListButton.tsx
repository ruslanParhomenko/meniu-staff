import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const DeleteListButton = ({
  id,
  api,
  refetch,
}: {
  id: number;
  api: string;
  refetch?: () => void;
}) => {
  const router = useRouter();
  const { isAdmin } = useAbility();
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");

  const deleteBreakList = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    await fetch(`/api/${api}/${id}`, { method: "DELETE" });
    toast.success("Брейк-лист успешно удалён !");

    if (refetch) {
      refetch();
    }

    router.refresh();
  };
  return (
    <div className="flex justify-start items-center py-2 pt-4">
      <Button
        type="button"
        variant={"default"}
        onClick={() => deleteBreakList(id)}
      >
        {tUI("delete")}
      </Button>
    </div>
  );
};
