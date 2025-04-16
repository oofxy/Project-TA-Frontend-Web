import { TableData } from "@/components/TableData";
import { getDivisi } from "@/data/data-master/divisi";
import { divisi } from "./columns";

const Divisi = async () => {
  const data = await getDivisi();

  return <TableData columns={divisi} data={data} />;
};

export default Divisi;
