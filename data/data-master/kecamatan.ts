import { Kecamatan } from "@/types";

export async function getKecamatan(): Promise<Kecamatan[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      kecamatan: "Testing",
    },
  ];
}
