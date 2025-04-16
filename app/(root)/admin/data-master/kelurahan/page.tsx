import { TableData } from "@/components/TableData";
import React from "react";
import { kelurahan } from "./columns";
import { getKelurahan } from "@/data/data-master/kelurahan";

export default async function Page() {
  const data = await getKelurahan();

  return <TableData columns={kelurahan} data={data} />;
}
