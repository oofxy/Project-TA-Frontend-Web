import { Divisi } from "@/types";

// GET - Mendapatkan data Divisi
export async function getDivisi(): Promise<Divisi[]> {
  const res = await fetch(`${process.env.API_URL}divisi`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
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

// POST - Menambahkan data Divisi baru
export async function postDivisi(data: Divisi): Promise<Divisi> {
  const res = await fetch(`${process.env.API_URL}divisi`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Check for a bad response
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to post Divisi: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  const createdData = await res.json();
  return createdData;
}

// PATCH - Mengupdate data Divisi yang sudah ada
export async function patchDivisi(
  id: string,
  data: Partial<Divisi>
): Promise<Divisi> {
  const res = await fetch(`${process.env.API_URL}divisi/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Check for a bad response
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to patch Divisi: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  const updatedData = await res.json();
  return updatedData;
}

// DELETE - Menghapus data Divisi
export async function deleteDivisi(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}divisi/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  // Check for a bad response
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete Divisi: ${res.status}`);
  }

  // No content expected in response
  if (res.status !== 204) {
    const text = await res.text();
    console.error("Unexpected response:", text);
    throw new Error("Expected no content after delete");
  }
}
