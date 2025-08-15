import SelectInput from "@/components/inputs/SelectInput";
import { useBreakListById } from "@/hooks/use-break-list-id";
import { useWatch } from "react-hook-form";
import BreakeListTable from "../breakList/BreakListByData";

export const ArhiveBreakListTable = ({
  data,
  refetch,
}: {
  data: any;
  loading: boolean;
  refetch: any;
}) => {
  const id = useWatch({ name: "selectDataId" });

  const { data: dataSelect, refetch: refetchId } = useBreakListById(id);

  return (
    <>
      <div className="w-1/4">
        <SelectInput fieldName={"selectDataId"} data={data} />
      </div>
      {dataSelect && (
        <BreakeListTable
          data={dataSelect}
          refetch={refetch}
          refetchId={refetchId}
        />
      )}
    </>
  );
};
