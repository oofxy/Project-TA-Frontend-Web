import { TableData } from "@/components/TableData";
import React from "react";
import { pekerjaan } from "./columns";
import { getPekerjaan } from "@/data/data-master/pekerjaan";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getPekerjaan();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Pekerjaan</Button>
        </CustomDialog>
      </div>
      <TableData columns={pekerjaan} data={data} />
    </div>
  );
}
