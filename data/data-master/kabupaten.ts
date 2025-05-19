import { Kabupaten } from "@/types";

// GET - Mengambil semua data Kabupaten
export async function getKabupaten(): Promise<Kabupaten[]> {
  const res = await fetch(`${process.env.API_URL}kabupaten`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch Kabupaten: ${res.status}`);
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

// POST - Menambahkan data Kabupaten
export async function postKabupaten(data: Kabupaten): Promise<Kabupaten> {
  const res = await fetch(`${process.env.API_URL}kabupaten`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to post Kabupaten: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// PATCH - Mengubah data Kabupaten
export async function patchKabupaten(
  id: string,
  data: Partial<Kabupaten>
): Promise<Kabupaten> {
  const res = await fetch(`${process.env.API_URL}kabupaten/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to patch Kabupaten: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// DELETE - Menghapus data Kabupaten
export async function deleteKabupaten(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}kabupaten/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete Kabupaten: ${res.status}`);
  }

  if (res.status !== 204) {
    const text = await res.text();
    console.error("Unexpected response:", text);
    throw new Error("Expected no content after delete");
  }
}
