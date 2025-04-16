import { Jabatan } from "@/types";

export async function getJabatan(): Promise<Jabatan[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      jabatan: "Testing",
    },
  ];
}
