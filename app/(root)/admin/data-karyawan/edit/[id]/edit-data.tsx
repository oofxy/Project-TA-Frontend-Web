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
import { editFieldGroups } from "@/lib/utils";

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

      {editFieldGroups.map(({ title, fields }) => (
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
