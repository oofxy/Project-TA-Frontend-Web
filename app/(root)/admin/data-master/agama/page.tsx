import { TableData } from "@/components/TableData";
import React from "react";
import { agama } from "./columns";
import CustomDialog from "./CustomDialog";
import { getAgama } from "@/data/data-master/agama";

export default async function Page() {
  const data = await getAgama();

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Agama</h1>
        <CustomDialog mode="add">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Tambah
          </button>
        </CustomDialog>
      </div>
      <TableData columns={agama} data={data} />
    </div>
  );
}
