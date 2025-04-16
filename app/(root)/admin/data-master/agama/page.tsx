import { TableData } from "@/components/TableData";
import React from "react";
import { agama } from "./columns";
import { getAgama } from "@/data/data-master/agama";

export default async function Page() {
  const data = await getAgama();

  return <TableData columns={agama} data={data} />;
}
