import SelectInput from "@/components/inputs/SelectInput";
import { useWatch } from "react-hook-form";
import { useRemarkById } from "@/hooks/use-remarks-list-id";
import RemarkTableByData from "../remarks/RemarkTableByData";
import { useState } from "react";

export const ArhiveRemarksListTable = ({ data }: { data: any }) => {
  const id = useWatch({ name: "selectDataId" });
  const { data: remarks } = useRemarkById(id);

  const [collapsed, setCollapsed] = useState(false);

  const handleDelete = () => {
    setCollapsed(true);
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
