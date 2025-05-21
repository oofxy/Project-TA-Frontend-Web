import { Pendidikan } from "@/types";

// GET - Ambil semua data Pendidikan
export async function getPendidikan(): Promise<Pendidikan[]> {
  const res = await fetch(`${process.env.API_URL}pendidikan`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch Pendidikan: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// POST - Tambah data Pendidikan
export async function postPendidikan(data: Pendidikan): Promise<Pendidikan> {
  const res = await fetch(`${process.env.API_URL}pendidikan`, {
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
    throw new Error(`Failed to post Pendidikan: ${res.status}`);
  }

  return await res.json();
}

// PATCH - Edit data Pendidikan
export async function patchPendidikan(
  id: string,
  data: Partial<Pendidikan>
): Promise<Pendidikan> {
  const res = await fetch(`${process.env.API_URL}pendidikan/${id}`, {
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
    throw new Error(`Failed to patch Pendidikan: ${res.status}`);
  }

  return await res.json();
}

// DELETE - Hapus data Pendidikan
export async function deletePendidikan(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}pendidikan/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete Pendidikan: ${res.status}`);
  }

  if (res.status !== 204) {
    const text = await res.text();
    console.error("Unexpected response:", text);
    throw new Error("Expected no content after delete");
  }
}
