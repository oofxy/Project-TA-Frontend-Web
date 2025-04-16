import { Pekerjaan } from "@/types";

export async function getPekerjaan(): Promise<Pekerjaan[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      pekerjaan: "Testing",
    },
  ];
}
