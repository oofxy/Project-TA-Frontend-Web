"use client";

import { useFormContext } from "@/app/features/onboarding/context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { submitFormAction } from "./actions";
import { NewForm } from "@/app/features/onboarding/schema";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FormField {
  label: string;
  value: string | undefined;
}

export default function Review() {
  const { newFormData, resetData } = useFormContext();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSections = [
    {
      title: "Data Pribadi",
      fields: [
        { label: "Nama", value: newFormData.nama },
        { label: "NIP", value: newFormData.nip },
        { label: "NIK", value: newFormData.nik },
        { label: "Email", value: newFormData.email },
        { label: "Telepon", value: newFormData.telephone },
        { label: "Tempat Lahir", value: newFormData.tempat_lahir },
        { label: "Tanggal Lahir", value: newFormData.tanggal_lahir },
        { label: "Alamat", value: newFormData.alamat },
      ] as FormField[],
    },
    {
      title: "Data Pasangan",
      fields: [
        { label: "Nama Pasangan", value: newFormData.nama_pasangan },
        {
          label: "Tempat Lahir Pasangan",
          value: newFormData.tempat_lahir_pasangan,
        },
        { label: "Pekerjaan Pasangan", value: newFormData.pekerjaan_pasangan },
        { label: "Telepon Pasangan", value: newFormData.telephone_pasangan },
      ] as FormField[],
    },
    {
      title: "Data Orang Tua",
      fields: [
        { label: "Nama Ayah", value: newFormData.nama_ayah },
        { label: "Nama Ibu", value: newFormData.nama_ibu },
        { label: "Alamat Ayah", value: newFormData.alamat_ayah },
        { label: "Alamat Ibu", value: newFormData.alamat_ibu },
      ] as FormField[],
    },
  ];

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const { success, errorMsg, redirect } = await submitFormAction(
        newFormData as NewForm
      );

      if (success) {
        toast.success("Data Berhasil Terkirim");
        resetData();
      } else if (errorMsg) {
        toast.error(errorMsg);
      }
      if (redirect) {
        router.push(redirect);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Terjadi kesalahan saat mengirim data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleFormSubmit} className="flex flex-col w-full gap-6">
      <div className="columns-1 md:columns-2 space-y-4">
        {formSections.map((section) => (
          <SectionCard key={section.title} title={section.title}>
            {section.fields.map((field, index) => (
              <FieldRow
                key={`${section.title}-${index}`}
                label={field.label}
                value={field.value}
              />
            ))}
          </SectionCard>
        ))}

        {newFormData.children?.map((child, index) => (
          <SectionCard key={`child-${index}`} title={`Data Anak ${index + 1}`}>
            <FieldRow label="Nama Anak" value={child.nama_anak} />
            <FieldRow label="NIK Anak" value={child.nik_anak} />
            <FieldRow
              label="Tempat Lahir Anak"
              value={child.tempat_lahir_anak}
            />
            <FieldRow
              label="Tanggal Lahir Anak"
              value={child.tanggal_lahir_anak}
            />
          </SectionCard>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className={cn(
            "bg-[#03624C] hover:bg-[#03624C]/90",
            "min-w-32 h-12 text-md",
            "transition-colors duration-200"
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Mengirim...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border rounded-lg p-4 bg-accent/50 break-inside-avoid">
      <h2 className="font-semibold text-lg">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-muted-foreground min-w-[120px]">
        {label}:
      </label>
      <p className="font-medium text-lg flex-1">
        {value || <span className="text-muted-foreground">-</span>}
      </p>
    </div>
  );
}
