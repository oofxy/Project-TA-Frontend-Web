"use client";

import { Button } from "@/components/ui/button";
import { viewFieldGroups } from "@/lib/utils";
import { DataKaryawan, DataAnak } from "@/types";
import { useRouter } from "next/navigation";

interface ViewDataProps {
  data: DataKaryawan;
  children: DataAnak[];
  selectOptions: Record<string, { value: string; label: string }[]>;
}

export default function ViewData({
  data,
  children,
  selectOptions,
}: ViewDataProps) {
  const router = useRouter();
  const getDisplayValue = (name: keyof DataKaryawan) => {
    const value = data[name];
    if (!value) return "-";

    const field = viewFieldGroups
      .flatMap((group) => group.fields)
      .find((f) => f.name === name);

    if (field?.type === "select") {
      const options = selectOptions[name] || [];
      const option = options.find((opt) => opt.value === value);
      return option?.label || value;
    }

    return value;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold pb-2">Detail Data Karyawan</h1>

      {viewFieldGroups.map(({ title, fields }) => (
        <section key={title} className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ label, name }) => (
              <div key={name}>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium mt-1">
                  {getDisplayValue(name as keyof DataKaryawan) || "-"}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* {children.length > 0 && (
        <section className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Data Anak</h2>
          <div className="space-y-6">
            {children.map((child, index) => (
              <div
                key={child.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-medium mb-4">Anak {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-medium mt-1">{child.name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NIK</p>
                    <p className="font-medium mt-1">{child.nik || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Jenis Kelamin
                    </p>
                    <p className="font-medium mt-1">
                      {selectOptions.jenis_kelamin_id?.find(
                        (opt) => opt.value === child.jenis_kelamin_id
                      )?.label ||
                        child.jenis_kelamin_id ||
                        "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tempat Lahir
                    </p>
                    <p className="font-medium mt-1">
                      {child.tempat_lahir || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tanggal Lahir
                    </p>
                    <p className="font-medium mt-1">
                      {child.tanggal_lahir || "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )} */}
      <div className="flex justify-end">
        <Button
          className="bg-[#17876E]"
          onClick={() => {
            router.push("/admin/data-karyawan");
          }}
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}
