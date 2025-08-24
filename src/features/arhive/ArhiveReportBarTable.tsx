import SelectInput from "@/components/inputs/SelectInput";
import { useWatch } from "react-hook-form";
import { useReportListById } from "@/hooks/use-report-list-id";
import { ReportTableByData } from "../report/bar/ReportTableByData";
import { useDataById } from "@/hooks/use-data-id";

export const ArhiveReportListTable = ({
  data,
  refetch,
}: {
  data: any;
  refetch: any;
}) => {
  const id = useWatch({ name: "selectDataId" });

  const { data: report, refetch: refetchId } = useDataById({
    id: id,
    api: "report",
  });
  const handleRefetch = () => {
    refetchId();
    refetch();
  };
  return (
    <>
      <div className="md:w-1/4 w-full py-4">
        <SelectInput fieldName={"selectDataId"} data={data} />
      </div>
      {report && <ReportTableByData data={report} refetch={handleRefetch} />}
    </>
  );
};
