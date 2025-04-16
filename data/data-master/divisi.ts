import { Divisi } from "@/types";

export async function getDivisi(): Promise<Divisi[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      divisi: "Testing",
    },
  ];
}
