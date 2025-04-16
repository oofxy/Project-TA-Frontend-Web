import { TableData } from "@/components/TableData";
import React from "react";
import { jenisKelamin } from "./columns";
import { getJenisKelamin } from "@/data/data-master/jenis-kelamin";

export default async function Page() {
  const data = await getJenisKelamin();

  return <TableData columns={jenisKelamin} data={data} />;
}
