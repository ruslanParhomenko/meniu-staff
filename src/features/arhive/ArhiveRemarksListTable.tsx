import SelectInput from "@/components/inputs/SelectInput";
import { useWatch } from "react-hook-form";
import { useRemarkById } from "@/hooks/use-remarks-list-id";
import RemarkTableByData from "../remarks/RemarkTableByData";
import { useState } from "react";

export const ArhiveRemarksListTable = ({ data }: { data: any }) => {
  const id = useWatch({ name: "selectDataId" });
  const { data: remarks, refetch } = useRemarkById(id);

  // state для управления закрытием Accordion
  const [collapsed, setCollapsed] = useState(false);

  const handleDelete = () => {
    // после удаления закрываем accordion
    setCollapsed(true);
    // обновляем данные в select / parent
    refetch();
  };

  return (
    <>
      <div className="md:w-1/4 w-full py-4">
        <SelectInput fieldName={"selectDataId"} data={data} />
      </div>
      {!collapsed && remarks && (
        <RemarkTableByData data={remarks} onDelete={handleDelete} />
      )}
    </>
  );
};
