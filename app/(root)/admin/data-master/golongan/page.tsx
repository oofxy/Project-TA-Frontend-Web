import { TableData } from "@/components/TableData";
import { getGolongan } from "@/data/data-master/golongan";
import { golongan } from "./columns";

const Golongan = async () => {
  const data = await getGolongan();

  return <TableData columns={golongan} data={data} />;
};

export default Golongan;
