import { TableData } from "@/components/TableData";
import React from "react";
import { pekerjaan } from "./columns";
import { getPekerjaan } from "@/data/data-master/pekerjaan";

export default async function Page() {
  const data = await getPekerjaan();

  return <TableData columns={pekerjaan} data={data} />;
}
