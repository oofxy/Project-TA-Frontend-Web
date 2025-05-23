import { TableData } from "@/components/TableData";
import React from "react";
import { agama } from "./columns";
import CustomDialog from "./CustomDialog";
import { getAgama } from "@/data/data-master/agama";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearcInput";

export default async function Page() {
  const data = await getAgama();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Agama</Button>
        </CustomDialog>
      </div>
      <TableData columns={agama} data={data} />
    </div>
  );
}
