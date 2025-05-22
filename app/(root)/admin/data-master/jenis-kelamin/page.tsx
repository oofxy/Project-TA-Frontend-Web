import { TableData } from "@/components/TableData";
import React from "react";
import { jenisKelamin } from "./columns";
import { getJenisKelamin } from "@/data/data-master/jenis-kelamin";
import CustomDialog from "./CustomDialog";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearcInput";

export default async function Page() {
  const data = await getJenisKelamin();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Jenis Kelamin</Button>
        </CustomDialog>
      </div>
      <TableData columns={jenisKelamin} data={data} />
    </div>
  );
}
