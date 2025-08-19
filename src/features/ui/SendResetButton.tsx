import { Button } from "@/components/ui/button";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";

export function SendResetButton({
  resetForm,
  fetchData,
}: {
  resetForm: () => void;
  fetchData?: () => void;
}) {
  const { isObserver } = useAbility();
  const t = useTranslations("UI");
  return (
    <div className="flex flex-col justify-between md:flex-row ">
      <div className="flex justify-between md:justify-start items-center  py-5  md:gap-10">
        <Button
          type="submit"
          variant={"default"}
          className="hover:bg-blue-600"
          disabled={isObserver}
        >
          {t("save")}
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
      <div className="flex justify-end items-center w-full">
        {fetchData && (
          <Button
            type="button"
            variant={"secondary"}
            className="hover:bg-red-600"
            onClick={() => {
              fetchData?.();
            }}
          >
            fetch data
          </Button>
        )}
      </div>
    </div>
  );
}
