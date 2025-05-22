import React from "react";
import { getDataKaryawan } from "@/data/data-karyawan";
import { TableData } from "@/components/TableData";
import { dataKaryawan } from "./columns";
import SearchInput from "@/components/SearchInput";

export default async function DataKaryawan() {
  const data = await getDataKaryawan();

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pb-6 pt-2">
        <SearchInput />
      </div>
      <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
        <TableData columns={dataKaryawan} data={data} />
      </div>
    </div>
  );
}
