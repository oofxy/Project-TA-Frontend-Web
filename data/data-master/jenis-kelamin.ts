import { JenisKelamin } from "@/types";

// GET - Mengambil semua data Jenis Kelamin
export async function getJenisKelamin(): Promise<JenisKelamin[]> {
  const res = await fetch(`${process.env.API_URL}jenis_kelamin`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch JenisKelamin: ${res.status}`);
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

// POST - Menambahkan data Jenis Kelamin
export async function postJenisKelamin(
  data: JenisKelamin
): Promise<JenisKelamin> {
  const res = await fetch(`${process.env.API_URL}jenis_kelamin`, {
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
    throw new Error(`Failed to post JenisKelamin: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// PATCH - Mengubah data Jenis Kelamin
export async function patchJenisKelamin(
  id: string,
  data: Partial<JenisKelamin>
): Promise<JenisKelamin> {
  const res = await fetch(`${process.env.API_URL}jenis_kelamin/${id}`, {
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
    throw new Error(`Failed to patch JenisKelamin: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// DELETE - Menghapus data Jenis Kelamin
export async function deleteJenisKelamin(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}jenis_kelamin/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete JenisKelamin: ${res.status}`);
  }

  if (res.status !== 204) {
    const text = await res.text();
    console.error("Unexpected response:", text);
    throw new Error("Expected no content after delete");
  }
}
