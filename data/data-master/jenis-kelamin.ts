import { JenisKelamin } from "@/types";

export async function getJenisKelamin(): Promise<JenisKelamin[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      jenisKelamin: "Testing",
    },
  ];
}
