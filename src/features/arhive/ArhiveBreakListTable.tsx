import SelectInput from "@/components/inputs/SelectInput";
import { useDataById } from "@/hooks/use-data-id";
import { useWatch } from "react-hook-form";
import BreakListTable from "../breakList/BreakListByData";

export const ArhiveBreakListTable = ({
  data,
  refetch,
}: {
  data: any;
  refetch: any;
}) => {
  const id = useWatch({ name: "selectDataId" });

  const { data: dataSelect, refetch: refetchId } = useDataById({
    id: id,
    api: "breakList",
  });

  const handleRefetch = () => {
    refetchId();
    refetch();
  };

  return (
    <>
      <div className="md:w-1/4 w-full py-4 ">
        <SelectInput fieldName={"selectDataId"} data={data} />
      </div>
      {dataSelect && (
        <BreakListTable data={dataSelect} refetch={handleRefetch} />
      )}
    </>
  );
};
