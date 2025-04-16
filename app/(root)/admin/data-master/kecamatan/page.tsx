import { TableData } from "@/components/TableData";
import React from "react";
import { kecamatan } from "./columns";
import { getKecamatan } from "@/data/data-master/kecamatan";

export default async function Page() {
  const data = await getKecamatan();

  return <TableData columns={kecamatan} data={data} />;
}
