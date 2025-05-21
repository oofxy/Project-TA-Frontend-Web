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

export async function patchDataKaryawan(
  id: string,
  data: Partial<DataKaryawan>
): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}karyawan/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify(data),
  });
  // Check for a bad response
  if (!res.ok) {
    const error = await res.text();
    console.log("Error response:", error);
    throw new Error(`Failed to fetch Karyawan: ${res.status}`);
  }
}

interface SelectOption {
  value: string;
  label: string;
}

type EndpointKeys = keyof typeof endpoints;

const endpoints = {
  agama_id: "agama",
  kelurahan_id: "kelurahan",
  pendidikan_id: "pendidikan",
  jenis_kelamin_id: "jenis_kelamin",
  pangkat_id: "pangkat",
  jabatan_id: "jabatan",
  pekerjaan_id: "pekerjaan",
  golongan_id: "golongan",
  divisi_id: "divisi",
  lokasi_kantor_id: "lokasi_kantor",
  lokasi_kerja_id: "lokasi_kerja",
  status_id: "status",
};

export async function fetchSelectOptions(): Promise<
  Record<EndpointKeys, SelectOption[]>
> {
  const results: Partial<Record<EndpointKeys, SelectOption[]>> = {};

  try {
    await Promise.all(
      Object.entries(endpoints).map(async ([key, endpoint]) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
            {
              cache: "no-store",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (!contentType?.includes("application/json")) {
            const text = await response.text();
            throw new Error(`Expected JSON but received: ${text}`);
          }

          const data = await response.json();

          if (!Array.isArray(data)) {
            throw new Error(`Expected array but received: ${typeof data}`);
          }

          results[key as EndpointKeys] = data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
        } catch (error) {
          console.error(`Failed to fetch ${key} from ${endpoint}`, error);
          results[key as EndpointKeys] = [];
        }
      })
    );
  } catch (error) {
    console.error("Unexpected error in fetchSelectOptions:", error);
    Object.keys(endpoints).forEach((key) => {
      results[key as EndpointKeys] = [];
    });
  }

  return results as Record<EndpointKeys, SelectOption[]>;
}
