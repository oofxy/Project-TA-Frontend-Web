import { Golongan } from "@/types";

export async function getGolongan(): Promise<Golongan[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      golongan: "Testing",
    },
  ];
}
