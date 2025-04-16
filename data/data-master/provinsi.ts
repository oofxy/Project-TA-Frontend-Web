import { Provinsi } from "@/types";

export async function getProvinsi(): Promise<Provinsi[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      provinsi: "Testing",
    },
  ];
}
