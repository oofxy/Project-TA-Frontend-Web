import { TableData } from "@/components/TableData";
import { getJabatan } from "@/data/data-master/jabatan";
import { jabatan } from "./columns";

const Jabatan = async () => {
  const data = await getJabatan();

  return <TableData columns={jabatan} data={data} />;
};

export default Jabatan;