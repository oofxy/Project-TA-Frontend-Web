import { TableData } from "@/components/TableData";
import React from "react";
import { provinsi } from "./columns";
import { getProvinsi } from "@/data/data-master/provinsi";

export default async function Page() {
  const data = await getProvinsi();

  return <TableData columns={provinsi} data={data} />;
}
