import { TableData } from "@/components/TableData";
import React from "react";
import { lokasiKerja } from "./columns";
import { getLokasiKerja } from "@/data/data-master/lokasi-kerja";

export default async function Page() {
  const data = await getLokasiKerja();

  return <TableData columns={lokasiKerja} data={data} />;
}
