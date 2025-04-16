import { Kabupaten } from "@/types";

export async function getKabupaten(): Promise<Kabupaten[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      kabupaten: "Testing",
    },
  ];
}
