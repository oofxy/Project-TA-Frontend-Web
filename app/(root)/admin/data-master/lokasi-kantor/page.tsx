import { TableData } from "@/components/TableData";
import React from "react";
import { lokasiKantor } from "./columns";
import { getLokasiKantor } from "@/data/data-master/lokasi-kantor";
import CustomDialog from "./CustomDialog";

export default async function Page() {
  const data = await getLokasiKantor();

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Lokasi Kantor</h1>
        <CustomDialog mode="add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Tambah
          </button>
        </CustomDialog>
      </div>
      <TableData columns={lokasiKantor} data={data} />
    </div>
  );
}
