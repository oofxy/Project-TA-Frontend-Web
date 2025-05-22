import { TableData } from "@/components/TableData";
import React from "react";
import { provinsi } from "./columns";
import { getProvinsi } from "@/data/data-master/provinsi";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getProvinsi();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Provinsi</Button>
        </CustomDialog>
      </div>
      <TableData columns={provinsi} data={data} />
    </div>
  );
}
