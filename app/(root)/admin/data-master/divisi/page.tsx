import { TableData } from "@/components/TableData";
import React from "react";
import { divisi } from "./columns";
import { getDivisi } from "@/data/data-master/divisi";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getDivisi();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Divisi</Button>
        </CustomDialog>
      </div>
      <TableData columns={divisi} data={data} />
    </div>
  );
}
