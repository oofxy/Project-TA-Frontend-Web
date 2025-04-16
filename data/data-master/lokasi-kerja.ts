import { LokasiKerja } from "@/types";

export async function getLokasiKerja(): Promise<LokasiKerja[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      lokasiKerja: "Testing",
    },
  ];
}
