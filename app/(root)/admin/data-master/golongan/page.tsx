import { TableData } from "@/components/TableData";
import React from "react";
import { golongan } from "./columns";
import { getGolongan } from "@/data/data-master/golongan";
import CustomDialog from "./CustomDialog";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearcInput";

export default async function Page() {
  const data = await getGolongan();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Golongan</Button>
        </CustomDialog>
      </div>
      <TableData columns={golongan} data={data} />
    </div>
  );
}
