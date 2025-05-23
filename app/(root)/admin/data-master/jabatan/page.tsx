import { TableData } from "@/components/TableData";
import React from "react";
import { jabatan } from "./columns";
import { getJabatan } from "@/data/data-master/jabatan";
import CustomDialog from "../agama/CustomDialog";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearcInput";

export default async function Page() {
  const data = await getJabatan();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Jabatan</Button>
        </CustomDialog>
      </div>
      <TableData columns={jabatan} data={data} />
    </div>
  );
}
