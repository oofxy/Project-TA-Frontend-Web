import { Agama } from "@/types";

export async function getAgama(): Promise<Agama[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      agama: "Testing",
    },
  ];
}
