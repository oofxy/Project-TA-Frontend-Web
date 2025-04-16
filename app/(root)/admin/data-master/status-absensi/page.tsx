import { TableData } from "@/components/TableData";
import React from "react";
import { statusAbsensi } from "./columns";
import { getStatusAbsensi } from "@/data/data-master/status-absensi";

export default async function Page() {
  const data = await getStatusAbsensi();

  return <TableData columns={statusAbsensi} data={data} />;
}
