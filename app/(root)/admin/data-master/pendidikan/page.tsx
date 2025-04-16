import { TableData } from "@/components/TableData";
import React from "react";
import { pendidikan } from "./columns";
import { getPendidikan } from "@/data/data-master/pendidikan";

export default async function Page() {
  const data = await getPendidikan();

  return <TableData columns={pendidikan} data={data} />;
}
