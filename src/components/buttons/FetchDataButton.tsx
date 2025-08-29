"use client";
import { Button } from "@/components/ui/button";
import { useAbility } from "@/providers/AbilityProvider";

export const FetchDataButton = ({ fetchData }: { fetchData?: () => void }) => {
  const { isObserver, isCucina } = useAbility();
  const isDisabled = isObserver || isCucina;
  return (
    <>
      {fetchData && (
        <Button
          type="button"
          variant="secondary"
          className="hover:bg-red-600"
          onClick={() => fetchData?.()}
          disabled={isDisabled}
        >
          fetch data
        </Button>
      )}
    </>
  );
};
