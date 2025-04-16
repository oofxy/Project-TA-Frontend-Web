import { TableData } from "@/components/TableData";
import React from "react";
import { lokasiKantor } from "./columns";
import { getLokasiKantor } from "@/data/data-master/lokasi-kantor";

export default async function Page() {
  const data = await getLokasiKantor();

  return <TableData columns={lokasiKantor} data={data} />;
}
