import { TableData } from "@/components/TableData";
import React from "react";
import { kabupaten } from "./columns";
import { getKabupaten } from "@/data/data-master/kabupaten";

export default async function Page() {
  const data = await getKabupaten();

  return <TableData columns={kabupaten} data={data} />;
}
