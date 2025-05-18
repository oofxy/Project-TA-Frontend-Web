"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patchDataKaryawan } from "@/data/data-karyawan";
import { DataKaryawan } from "@/types";
import { Loader2 } from "lucide-react";

// Define field types more precisely
type FieldType = "text" | "email" | "date" | "select";
type FieldConfig = {
  label: string;
  name: keyof DataKaryawan;
  type: FieldType;
  required?: boolean;
};

const defaultData = (id: string): DataKaryawan => ({
  id,
  name: "",
  email: "",
  nip: "",
  nik: "",
  telephone: "",
  alamat: "",
  agama_id: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  kelurahan_id: "",
  pendidikan_id: "",
  npwp: "",
  jenis_kelamin_id: "",
  mulai_tugas: "",
  pangkat_id: "",
  jabatan_id: "",
  pekerjaan_id: "",
  golongan_id: "",
  divisi_id: "",
  lokasi_kantor_id: "",
  lokasi_kerja_id: "",
  status_id: "",
  nama_pasangan: "",
  tempat_lahir_pasangan: "",
  pekerjaan_id_pasangan: "",
  telephone_pasangan: "",
  nama_ayah: "",
  nama_ibu: "",
  alamat_ayah: "",
  alamat_ibu: "",
});

const fieldGroups: { title: string; fields: FieldConfig[] }[] = [
  {
    title: "Data Diri",
    fields: [
      { label: "Nama", name: "name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
      { label: "NIP", name: "nip", type: "text", required: true },
      { label: "NIK", name: "nik", type: "text", required: true },
      { label: "Telephone", name: "telephone", type: "text", required: true },
      { label: "Alamat", name: "alamat", type: "text", required: true },
      { label: "Agama", name: "agama_id", type: "select", required: true },
      {
        label: "Tempat Lahir",
        name: "tempat_lahir",
        type: "text",
        required: true,
      },
      {
        label: "Tanggal Lahir",
        name: "tanggal_lahir",
        type: "date",
        required: true,
      },
      {
        label: "Kelurahan",
        name: "kelurahan_id",
        type: "select",
        required: true,
      },
      {
        label: "Pendidikan",
        name: "pendidikan_id",
        type: "select",
        required: true,
      },
      { label: "NPWP", name: "npwp", type: "text", required: true },
      {
        label: "Jenis Kelamin",
        name: "jenis_kelamin_id",
        type: "select",
        required: true,
      },
      {
        label: "Mulai Tugas",
        name: "mulai_tugas",
        type: "date",
        required: true,
      },
      { label: "Pangkat", name: "pangkat_id", type: "select", required: true },
      { label: "Jabatan", name: "jabatan_id", type: "select", required: true },
      {
        label: "Pekerjaan",
        name: "pekerjaan_id",
        type: "select",
        required: true,
      },
      {
        label: "Golongan",
        name: "golongan_id",
        type: "select",
        required: true,
      },
      { label: "Divisi", name: "divisi_id", type: "select", required: true },
      {
        label: "Lokasi Kantor",
        name: "lokasi_kantor_id",
        type: "select",
        required: true,
      },
      {
        label: "Lokasi Kerja",
        name: "lokasi_kerja_id",
        type: "select",
        required: true,
      },
      { label: "Status", name: "status_id", type: "select", required: true },
    ],
  },
  {
    title: "Data Pasangan",
    fields: [
      { label: "Nama Pasangan", name: "nama_pasangan", type: "text" },
      {
        label: "Tempat Lahir Pasangan",
        name: "tempat_lahir_pasangan",
        type: "text",
      },
      {
        label: "Pekerjaan Pasangan",
        name: "pekerjaan_id_pasangan",
        type: "text",
      },
      { label: "Telepon Pasangan", name: "telephone_pasangan", type: "text" },
    ],
  },
  {
    title: "Data Orang Tua",
    fields: [
      { label: "Nama Ayah", name: "nama_ayah", type: "text" },
      { label: "Nama Ibu", name: "nama_ibu", type: "text" },
      { label: "Alamat Ayah", name: "alamat_ayah", type: "text" },
      { label: "Alamat Ibu", name: "alamat_ibu", type: "text" },
    ],
  },
];

interface EditDataProps {
  id: string;
  initialData: Partial<DataKaryawan>;
  selectOptions: Record<string, { value: string; label: string }[]>;
}

export default function EditData({
  id,
  initialData,
  selectOptions,
}: EditDataProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DataKaryawan>({
    ...defaultData(id),
    ...initialData,
  });

  const handleChange = useCallback(
    (name: keyof DataKaryawan, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await patchDataKaryawan(id, formData);
      toast.success("Data berhasil diubah");
      router.push("/admin/data-karyawan");
      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Data gagal diubah");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold pb-6">Edit Data Karyawan</h1>

      {fieldGroups.map(({ title, fields }) => (
        <section
          key={title}
          className="flex flex-col gap-4 border rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ label, name, type, required }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name}>
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </Label>

                {type === "select" ? (
                  <Select
                    value={formData[name]?.toString() || ""}
                    onValueChange={(value) => handleChange(name, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Pilih ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions[name]?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={name}
                    type={type}
                    value={formData[name]?.toString() || ""}
                    onChange={(e) => handleChange(name, e.target.value)}
                    autoComplete="off"
                    required={required}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex justify-end gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/data-karyawan")}
          disabled={isLoading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="min-w-24 bg-[#17876E]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              Menyimpan...
            </span>
          ) : (
            "Simpan"
          )}
        </Button>
      </div>
    </form>
  );
}
