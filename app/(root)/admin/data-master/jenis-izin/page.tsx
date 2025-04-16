import { TableData } from "@/components/TableData";
import React from "react";
import { jenisIzin } from "./columns";
import { getJenisIzin } from "@/data/data-master/jenis-izin";

export default async function Page() {
  const data = await getJenisIzin();

  return <TableData columns={jenisIzin} data={data} />;
}
