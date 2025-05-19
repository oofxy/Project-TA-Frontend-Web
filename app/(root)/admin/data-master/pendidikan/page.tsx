import { TableData } from "@/components/TableData";
import React from "react";
import { pendidikan } from "./columns";
import { getPendidikan } from "@/data/data-master/pendidikan";
import CustomDialog from "./CustomDialog";

export default async function Page() {
  const data = await getPendidikan();

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Pendidikan</h1>
        <CustomDialog mode="add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Tambah
          </button>
        </CustomDialog>
      </div>
      <TableData columns={pendidikan} data={data} />
    </div>
  );
}
