import { DataKaryawan } from "@/types";

export async function getDataKaryawan(): Promise<DataKaryawan[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}karyawan`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  // Check for a bad response
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch User: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  const data = await res.json();
  return data;
}
