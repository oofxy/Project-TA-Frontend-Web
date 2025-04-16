import { Divisi } from "@/types";

export async function getDivisi(): Promise<Divisi[]> {
  const res = await fetch(`${process.env.API_URL}divisi`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 1|6WybpTmcoAVYaskaDbVInGxO43bCr6iCl5o16lr5dec6dd56`,
    },
  });

  // Check for a bad response
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch Divisi: ${res.status}`);
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
