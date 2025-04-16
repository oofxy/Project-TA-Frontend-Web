import { TableData } from "@/components/TableData";
import React from "react";
import { pangkat } from "./columns";
import { getPangkat } from "@/data/data-master/pangkat";

export default async function Page() {
  const data = await getPangkat();

  return <TableData columns={pangkat} data={data} />;
}
