import { Kelurahan } from "@/types";

export async function getKelurahan(): Promise<Kelurahan[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      kelurahan: "Testing",
    },
  ];
}
