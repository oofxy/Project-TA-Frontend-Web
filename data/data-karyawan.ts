import { DataKaryawan } from "@/types";

export async function getDataKaryawan(): Promise<DataKaryawan[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      nama: "John Doe",
      email: "john.doe@example.com",
      telepon: "08123456789",
      alamat: "Jl. Sudirman No. 1, Jakarta",
      agama: "Islam",
      edit: "",
    },
    {
      id: 2,
      nama: "Jane Doe",
      email: "jane.doe@example.com",
      telepon: "08129876543",
      alamat: "Jl. Gatot Subroto No. 2, Jakarta",
      agama: "Kristen",
      edit: "",
    },
    {
      id: 3,
      nama: "James Sul",
      email: "james.sul@example.com",
      telepon: "081211122233",
      alamat: "Jl. Asia Afrika No. 3, Bandung",
      agama: "Hindu",
      edit: "",
    },
    {
      id: 4,
      nama: "Mike Wazo",
      email: "mike.wazo@example.com",
      telepon: "081211122233",
      alamat: "Jl. Jepan Pakis No. 3, Malang",
      agama: "Protestan",
      edit: "",
    },
    // ...
  ];
}