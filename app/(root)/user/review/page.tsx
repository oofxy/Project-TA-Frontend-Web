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

  const formFields = [
    { label: "Nama", value: newFormData.nama },
    { label: "NIP", value: newFormData.nip },
    { label: "NIK", value: newFormData.nik },
    { label: "Email", value: newFormData.email },
    { label: "Telepon", value: newFormData.telephone },
    { label: "Tempat Lahir", value: newFormData.tempat_lahir },
    { label: "Tanggal Lahir", value: newFormData.tanggal_lahir },
    { label: "Alamat", value: newFormData.alamat },
    { label: "Nama Pasangan", value: newFormData.nama_pasangan },
    {
      label: "Tempat Lahir Pasangan",
      value: newFormData.tempat_lahir_pasangan,
    },
    { label: "Pekerjaan Pasangan", value: newFormData.pekerjaan_pasangan },
    { label: "Telepon Pasangan", value: newFormData.telephone_pasangan },
    { label: "Nama Ayah", value: newFormData.nama_ayah },
    { label: "Nama Ibu", value: newFormData.nama_ibu },
    { label: "Alamat Ayah", value: newFormData.alamat_ayah },
    { label: "Alamat Ibu", value: newFormData.alamat_ibu },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-2xl">
        {formFields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col bg-green-50 border border-green-100 p-2 rounded"
          >
            <h1 className="text-[14px]">{field.label}</h1>
            <p className="font-semibold text-[18px]">{field.value || "-"}</p>
          </div>
        ))}
        {newFormData.children?.map((anak, index) => (
          <div key={index}>
            <div className="">Nama Anak: {anak.nama_anak}</div>
            <div className="">NIK Anak: {anak.nik_anak}</div>
            <div className="">Tempat Lahir Anak: {anak.tempat_lahir_anak}</div>
            <div className="">Tanggal Lahir Anak: {anak.tanggal_lahir_anak}</div>
          </div>
        ))}
      </div>
      <Button className="bg-[#03624C] hover:bg-[#03624C]/80 mt-4">
        Submit
      </Button>
    </form>
  );
}
