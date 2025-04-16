import { StatusAbsensi } from "@/types";

export async function getStatusAbsensi(): Promise<StatusAbsensi[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      statusAbsensi: "Testing",
    },
  ];
}
