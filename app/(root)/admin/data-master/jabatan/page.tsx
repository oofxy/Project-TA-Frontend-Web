import { TableData } from "@/components/TableData";
import React from "react";
import { jabatan } from "./columns";
import { getJabatan } from "@/data/data-master/jabatan";
import CustomDialog from "../agama/CustomDialog";

export default async function Page() {
  const data = await getJabatan();

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Jabatan</h1>
        <CustomDialog mode="add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Tambah
          </button>
        </CustomDialog>
      </div>
      <TableData columns={jabatan} data={data} />
    </div>
  );
}
