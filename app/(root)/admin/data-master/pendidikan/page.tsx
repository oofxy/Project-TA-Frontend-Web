import { TableData } from "@/components/TableData";
import React from "react";
import { pendidikan } from "./columns";
import { getPendidikan } from "@/data/data-master/pendidikan";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getPendidikan();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Pendidikan</Button>
        </CustomDialog>
      </div>
      <TableData columns={pendidikan} data={data} />
    </div>
  );
}
