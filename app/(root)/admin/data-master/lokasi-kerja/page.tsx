import { TableData } from "@/components/TableData";
import React from "react";
import { lokasiKerja } from "./columns";
import { getLokasiKerja } from "@/data/data-master/lokasi-kerja";
import CustomDialoglokasikerja from "./CustomDialogLokasiKerja";
import CustomDialog from "./CustomDialogLokasiKerja";

export default async function Page() {
  const data = await getLokasiKerja();

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Lokasi Kerja</h1>
        <CustomDialog mode="add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Tambah
          </button>
        </CustomDialog>
      </div>
      <TableData columns={lokasiKerja} data={data} />
    </div>
  );
}
