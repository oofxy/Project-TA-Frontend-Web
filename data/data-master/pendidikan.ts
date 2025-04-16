import { Pendidikan } from "@/types";

export async function getPendidikan(): Promise<Pendidikan[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      pendidikan: "Testing",
    },
  ];
}
