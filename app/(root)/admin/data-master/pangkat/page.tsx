import { TableData } from "@/components/TableData";
import React from "react";
import { pangkat } from "./columns";
import { getPangkat } from "@/data/data-master/pangkat";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getPangkat();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Pangkat</Button>
        </CustomDialog>
      </div>
      <TableData columns={pangkat} data={data} />
    </div>
  );
}
