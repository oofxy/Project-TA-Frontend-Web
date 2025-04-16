import { Pangkat } from "@/types";

export async function getPangkat(): Promise<Pangkat[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      pangkat: "Testing",
    },
  ];
}
