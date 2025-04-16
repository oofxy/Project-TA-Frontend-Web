import { LokasiKantor } from "@/types";

export async function getLokasiKantor(): Promise<LokasiKantor[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      lokasiKantor: "Testing",
    },
  ];
}
