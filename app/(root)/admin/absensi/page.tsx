import React from "react";
import { TableData } from "@/components/TableData";
import { absensi } from "./columns";
import { getAbsen } from "@/data/absensi";

const Absensi = async () => {
  const data = await getAbsen();
  const rowsPerPage = 9;

  return (
    <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
      <TableData columns={absensi} data={data} />
    </div>
  );
};

export default Absensi;
