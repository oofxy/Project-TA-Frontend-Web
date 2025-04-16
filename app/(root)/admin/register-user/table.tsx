import { TableData } from "@/components/TableData";
import { DataKaryawan, DataRegisterUser } from "@/types";
import { dataKaryawan } from "../data-karyawan/columns";
import { dataRegisterUser } from "./columns";

async function getData(): Promise<DataRegisterUser[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      nama: "John Doe",
      akun: "john.doe@example.com",
      password: "johndoe123",
      edit: "",
    },
    {
      id: 2,
      nama: "Jane Doe",
      akun: "jane.doe@example.com",
      password: "janedoe123",
      edit: "",
    },
    {
      id: 3,
      nama: "James Sul",
      akun: "james.sul@example.com",
      password: "jamessul123",
      edit: "",
    },
    {
      id: 4,
      nama: "Mike Wazo",
      akun: "mike.wazo@example.com",
      password: "mikewazo123",
      edit: "",
    },
    // ...
  ];
}

export default async function Table() {
  const data = await getData();

  return (
    <div className="flex flex-col h-full justify-between">
      <TableData columns={dataRegisterUser} data={data} />
    </div>
  );
}
