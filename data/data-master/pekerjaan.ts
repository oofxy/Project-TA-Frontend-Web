import { Pekerjaan } from "@/types";

// GET - Ambil semua data Pekerjaan
export async function getPekerjaan(): Promise<Pekerjaan[]> {
  const res = await fetch(`${process.env.API_URL}pekerjaan`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch Pekerjaan: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// POST - Tambah data Pekerjaan
export async function postPekerjaan(data: Pekerjaan): Promise<Pekerjaan> {
  const res = await fetch(`${process.env.API_URL}pekerjaan`, {
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
    throw new Error(`Failed to post Pekerjaan: ${res.status}`);
  }

  return await res.json();
}

// PATCH - Edit data Pekerjaan
export async function patchPekerjaan(
  id: string,
  data: Partial<Pekerjaan>
): Promise<Pekerjaan> {
  const res = await fetch(`${process.env.API_URL}pekerjaan/${id}`, {
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
    throw new Error(`Failed to patch Pekerjaan: ${res.status}`);
  }

  return await res.json();
}

// DELETE - Hapus data Pekerjaan
export async function deletePekerjaan(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}pekerjaan/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete Pekerjaan: ${res.status}`);
  }

  if (res.status !== 204) {
    const text = await res.text();
    console.error("Unexpected response:", text);
    throw new Error("Expected no content after delete");
  }
}
