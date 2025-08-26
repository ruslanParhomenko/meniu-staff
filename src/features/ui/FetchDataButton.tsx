import { Button } from "@/components/ui/button";

export const FetchDataButton = ({ fetchData }: { fetchData?: () => void }) => {
  return (
    <>
      {fetchData && (
        <Button
          type="button"
          variant="secondary"
          className="hover:bg-red-600"
          onClick={() => fetchData?.()}
        >
          fetch data
        </Button>
      )}
    </>
  );
};
