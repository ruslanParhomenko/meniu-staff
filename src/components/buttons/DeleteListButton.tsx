import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const DeleteListButton = ({
  data,
  api,
  refetch,
}: {
  data: { id: number; date: string };
  api: string;
  refetch?: () => void;
}) => {
  const router = useRouter();
  const { isAdmin } = useAbility();
  const t = useTranslations("Home");

  const deleteBreakList = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    await fetch(`/api/${api}/${data?.id}`, { method: "DELETE" });
    toast.success("Архив успешно удалён !");

    if (refetch) {
      refetch();
    }

    router.refresh();
  };
  return (
    <div className="flex w-full justify-between items-center p-4 pt-4">
      <div className="text-lg font-semibold">
        {new Date(data.date).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </div>
      <Button
        type="button"
        variant={"default"}
        onClick={() => deleteBreakList(data?.id)}
      >
        {t("delete")}
      </Button>
    </div>
  );
};
