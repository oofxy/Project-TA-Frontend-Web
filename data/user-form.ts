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
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
              },
              cache: "no-store",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (!contentType?.includes("application/json")) {
            const text = await response.text();
            if (text.trim().startsWith("<!DOCTYPE html>")) {
              throw new Error(
                `API endpoint returned HTML instead of JSON: ${endpoint}`
              );
            }
            throw new Error(`Expected JSON but received: ${contentType}`);
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
