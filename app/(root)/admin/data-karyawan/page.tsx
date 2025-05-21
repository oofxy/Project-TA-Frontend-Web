import React from "react";
import { getDataKaryawan } from "@/data/data-karyawan";
import { TableData } from "@/components/TableData";
import { dataKaryawan } from "./columns";
import CustomDialog from "./CustomDialog";

export default async function DataKaryawan() {
  const data = await getDataKaryawan();

  return (
    <div className="flex flex-col h-full">
      <CustomDialog />
      <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
        <TableData columns={dataKaryawan} data={data} />
      </div>
    </div>
  );
}
