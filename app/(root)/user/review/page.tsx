"use client";

import { useFormContext } from "@/app/features/onboarding/context";
import { Button } from "@/components/ui/button";
import React from "react";
import { submitFormAction } from "./actions";
import { NewForm } from "@/app/features/onboarding/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Review() {
  const { newFormData, resetData } = useFormContext();
  const router = useRouter();

  const personalFormFields = [
    { label: "Nama", value: newFormData.nama },
    { label: "NIP", value: newFormData.nip },
    { label: "NIK", value: newFormData.nik },
    { label: "Email", value: newFormData.email },
    { label: "Telepon", value: newFormData.telephone },
    { label: "Tempat Lahir", value: newFormData.tempat_lahir },
    { label: "Tanggal Lahir", value: newFormData.tanggal_lahir },
    { label: "Alamat", value: newFormData.alamat },
  ];

  const partnerFormFields = [
    { label: "Nama Pasangan", value: newFormData.nama_pasangan },
    {
      label: "Tempat Lahir Pasangan",
      value: newFormData.tempat_lahir_pasangan,
    },
    { label: "Pekerjaan Pasangan", value: newFormData.pekerjaan_pasangan },
    { label: "Telepon Pasangan", value: newFormData.telephone_pasangan },
  ];

  const parentFormFields = [
    { label: "Nama Ayah", value: newFormData.nama_ayah },
    { label: "Nama Ibu", value: newFormData.nama_ibu },
    { label: "Alamat Ayah", value: newFormData.alamat_ayah },
    { label: "Alamat Ibu", value: newFormData.alamat_ibu },
  ];

  const childrenFormFields = [
    { label: "Nama Anak", value: newFormData.nama_anak },
    { label: "NIK Anak", value: newFormData.nik_anak },
    { label: "Tempat Lahir Anak", value: newFormData.tempat_lahir_anak },
    { label: "Tanggal Lahir Anak", value: newFormData.tanggal_lahir_anak },
  ];

  const handleFormSubmit = async (formData: FormData) => {
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
  };

  return (
    <form
      action={handleFormSubmit}
      className="flex flex-col md:items-end justify-center w-full"
    >
      <div className="columns-1 md:columns-2 gap-4 space-y-4 w-2xl">
        <div className="flex flex-col gap-2 break-inside-avoid">
          <h1 className="font-semibold text-[20px]">Data Pribadi</h1>
          <div className="flex flex-col gap-2 border p-4 rounded-lg bg-accent">
            {personalFormFields.map((field, index) => (
              <div key={index} className="flex gap-2">
                <label className="font-normal">{field.label}:</label>
                <p className="font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 break-inside-avoid">
          <h1 className="font-semibold text-[20px]">Data Pasangan</h1>
          <div className="flex flex-col gap-2 border p-4 rounded-lg bg-accent">
            {partnerFormFields.map((field, index) => (
              <div key={index} className="flex gap-2">
                <label className="font-normal">{field.label}:</label>
                <p className="font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 break-inside-avoid">
          <h1 className="font-semibold text-[20px]">Data Orang tua</h1>
          <div className="flex flex-col gap-2 border p-4 rounded-lg bg-accent">
            {parentFormFields.map((field, index) => (
              <div key={index} className="flex gap-2">
                <label className="font-normal">{field.label}:</label>
                <p className="font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {newFormData.children?.map((child, index) => (
          <div key={index} className="flex flex-col gap-2 break-inside-avoid">
            <h1 className="font-semibold text-[20px]">Data Anak {index + 1}</h1>
            <div className="flex flex-col gap-2 border p-4 rounded-lg bg-accent mb-4">
              <div className="flex gap-2">
                <label className="font-normal">Nama Anak:</label>
                <p className="font-semibold">{child.nama_anak}</p>
              </div>
              <div className="flex gap-2">
                <label className="font-normal">NIK Anak:</label>
                <p className="font-semibold">{child.nik_anak}</p>
              </div>
              <div className="flex gap-2">
                <label className="font-normal">Tempat Lahir Anak:</label>
                <p className="font-semibold">{child.tempat_lahir_anak}</p>
              </div>
              <div className="flex gap-2">
                <label className="font-normal">Tanggal Lahir Anak:</label>
                <p className="font-semibold">{child.tanggal_lahir_anak}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className="bg-[#03624C] hover:bg-[#03624C]/80 mt-4 h-10 w-30">
        Submit
      </Button>
    </form>
  );
}
