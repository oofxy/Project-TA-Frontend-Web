import { dataRegisterUser } from "./columns";
import { TableData } from "@/components/TableData";
import { getKaryawan, getRegisterUser } from "@/data/register-user";
import CustomDialog from "./CustomDialog";

export default async function DataRegisterUser() {
  const data = await getRegisterUser();
  const karyawanData = await getKaryawan();

  return (
    <div className="flex flex-col h-full">
      <CustomDialog karyawanData={karyawanData}/>
      <div className="w-full h-full bg-[#CDF9EF] rounded-3xl">
        <TableData columns={dataRegisterUser} data={data} />
      </div>
    </div>
  );
}
