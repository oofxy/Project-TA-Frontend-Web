import { TableData } from "@/components/TableData";
import React from "react";
import { kelurahan } from "./columns";
import { getKelurahan } from "@/data/data-master/kelurahan";
import CustomDialog from "./CustomDialog";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearcInput";

export default async function Page() {
  const data = await getKelurahan();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Kelurahan</Button>
        </CustomDialog>
      </div>
      <TableData columns={kelurahan} data={data} />
    </div>
  );
}
