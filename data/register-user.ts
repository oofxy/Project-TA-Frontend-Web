import { DataRegisterUser } from "@/types";

export async function getRegisterUser(): Promise<DataRegisterUser[]> {
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