import { JenisIzin } from "@/types";

export async function getJenisIzin(): Promise<JenisIzin[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      jenisIzin: "Testing",
    },
  ];
}
