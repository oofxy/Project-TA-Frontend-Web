import { dataRegisterUser } from "./columns";
import { TableData } from "@/components/TableData";
import { getRegisterUser } from "@/data/register-user";

export default async function DataRegisterUser() {
  const data = await getRegisterUser();

  return (
    <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
      <TableData columns={dataRegisterUser} data={data} />
    </div>
  );
}
