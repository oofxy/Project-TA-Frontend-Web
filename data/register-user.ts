import { DataRegisterKaryawan, DataRegisterUser } from "@/types";

export async function getRegisterUser(): Promise<DataRegisterUser[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
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

export async function postRegisterUser({
  selectedKaryawan,
  selectedName,
  selectedEmail,
  hashPassword,
}: {
  selectedKaryawan: string;
  selectedName: string;
  selectedEmail: string;
  hashPassword: string;
}): Promise<void> {
  console.log({
    karyawan_id: selectedKaryawan,
    name: selectedName,
    email: selectedEmail,
    password: hashPassword,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      karyawan_id: selectedKaryawan,
      name: selectedName,
      email: selectedEmail,
      password: hashPassword,
    }),
  });

  if (!res.ok) throw new Error("Registration failed");
}

export const checkUserExists = async (email: string, id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}user/check?email=${email}&id=${id}`
    );
    if (!res.ok) return false;
    const result = await res.json();
    return result.exists;
  } catch {
    return false;
  }
};

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log("Error:", error);
    throw new Error("Failed to delete user");
  }
}

export async function getKaryawan(): Promise<DataRegisterKaryawan[]> {
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
    throw new Error(`Failed to fetch Karyawan: ${res.status}`);
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
