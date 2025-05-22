import { TableData } from "@/components/TableData";
import React from "react";
import { jenisIzin } from "./columns";
import { getJenisIzin } from "@/data/data-master/jenis-izin";
import CustomDialog from "./CustomDialog";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearcInput";

export default async function Page() {
  const data = await getJenisIzin();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Jenis Izin</Button>
        </CustomDialog>
      </div>
      <TableData columns={jenisIzin} data={data} />
    </div>
  );
}
