import { TableData } from "@/components/TableData";
import React from "react";
import { statusAbsensi } from "./columns";
import { getStatusAbsensi } from "@/data/data-master/status-absensi";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getStatusAbsensi();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Status Absensi</Button>
        </CustomDialog>
      </div>
      <TableData columns={statusAbsensi} data={data} />
    </div>
  );
}
