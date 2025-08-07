import { createAxiosWithAuth } from "@/lib/axiosAuth";

export async function getAllOptions() {
  const axiosAuth = await createAxiosWithAuth();

  const endpoints = [
    "agama",
    "pendidikan",
    "jenis-kelamin",
    "pangkat",
    "jabatan",
    "pekerjaan",
    "golongan",
    "divisi",
    "lokasi-kantor",
    "lokasi-kerja",
    "status",
    "kelurahan",
  ];

  const fetchAll = await Promise.all(
    endpoints.map(async (endpoint) => {
      const res = await axiosAuth.get(endpoint);
      return {
        key: endpoint.replace(/-/g, "_") + "_id",
        options: res.data.map((item: any) => ({
          value: String(item.id),
          label: item.nama,
        })),
      };
    })
  );

  const selectOptions: Record<string, { value: string; label: string }[]> = {};

  fetchAll.forEach(({ key, options }) => {
    selectOptions[key] = options;
  });

  return selectOptions;
}
