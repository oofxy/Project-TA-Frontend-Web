import { StatusAbsensi } from "@/types";

// GET - Ambil semua data Status Absensi
export async function getStatusAbsensi(): Promise<StatusAbsensi[]> {
  const res = await fetch(`${process.env.API_URL}status_absensi`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch Status Absensi: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Expected JSON, got:", text);
    throw new Error("Invalid content type: " + contentType);
  }

  return await res.json();
}

// POST - Tambah data Status Absensi
export async function postStatusAbsensi(
  data: StatusAbsensi
): Promise<StatusAbsensi> {
  const res = await fetch(`${process.env.API_URL}status_absensi`, {
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
    throw new Error(`Failed to post Status Absensi: ${res.status}`);
  }

  return await res.json();
}

// PATCH - Edit data Status Absensi
export async function patchStatusAbsensi(
  id: string,
  data: Partial<StatusAbsensi>
): Promise<StatusAbsensi> {
  const res = await fetch(`${process.env.API_URL}status_absensi/${id}`, {
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
    throw new Error(`Failed to patch Status Absensi: ${res.status}`);
  }

  return await res.json();
}

// DELETE - Hapus data Status Absensi
export async function deleteStatusAbsensi(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}status_absensi/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer 5|C6mDXtULlGWycweq3dp2gwK80ffrO0dhI8aMSLbQf560bed1`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to delete Status Absensi: ${res.status}`);
  }

  if (res.status !== 204) {
    const text = await res.text();
    console.error("Unexpected response:", text);
    throw new Error("Expected no content after delete");
  }
}
