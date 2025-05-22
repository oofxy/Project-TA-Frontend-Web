import { TableData } from "@/components/TableData";
import React from "react";
import { lokasiKantor } from "./columns";
import { getLokasiKantor } from "@/data/data-master/lokasi-kantor";
import CustomDialog from "./CustomDialog";
import SearchInput from "@/components/SearcInput";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getLokasiKantor();

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-5 pb-4 pt-2">
        <SearchInput />
        <CustomDialog mode="add">
          <Button className="bg-[#17876E]">Add Lokasi Kantor</Button>
        </CustomDialog>
      </div>
      <TableData columns={lokasiKantor} data={data} />
    </div>
  );
}
