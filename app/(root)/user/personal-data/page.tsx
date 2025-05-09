"use client";

import { NewForm, newFormSchema } from "@/app/features/onboarding/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useActionState } from "react";
import { useForm } from "react-hook-form";
import { personalFormAction } from "./actions";
import { FormErrors } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";

const fields: {
  name: keyof NewForm;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "nama",
    label: "Nama Lengkap",
    type: "text",
    placeholder: "Masukan Nama Lengkap",
  },
  { name: "nip", label: "NIP", type: "text", placeholder: "Masukan NIP" },
  { name: "nik", label: "NIK", type: "text", placeholder: "Masukan NIK" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Masukan Email",
  },
  {
    name: "telephone",
    label: "Nomor Telepon",
    type: "tel",
    placeholder: "Masukan No. Telepon",
  },
  {
    name: "tempat_lahir",
    label: "Tempat Lahir",
    type: "text",
    placeholder: "Masukan Tempat Lahir",
  },
  {
    name: "tanggal_lahir",
    label: "Tanggal Lahir",
    type: "date",
    placeholder: "dd-mm-yyyy",
  },
  {
    name: "alamat",
    label: "Alamat",
    type: "text",
    placeholder: "Masukan Alamat",
  },
  {
    name: "npwp",
    label: "NPWP",
    type: "text",
    placeholder: "Masukan NPWP",
  },
];

const initialState: FormErrors = {};

export default function Personal() {
  const { updateNewFormDetails, newFormData } = useFormContext();
  const [formState, formAction] = useActionState(
    personalFormAction,
    initialState
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof NewForm
  ) => {
    form.setValue(fieldName, e.target.value, { shouldValidate: true });

    // If the server error exists for this field, manually clear it
    if (formState?.[fieldName]) {
      formState[fieldName] = undefined;
    }
  };
  const form = useForm<NewForm>({
    resolver: zodResolver(newFormSchema),
    defaultValues: {
      nama: newFormData.nama || "",
      nip: newFormData.nip || "",
      nik: newFormData.nik || "",
      email: newFormData.email || "",
      telephone: newFormData.telephone || "",
      tempat_lahir: newFormData.tempat_lahir || "",
      tanggal_lahir: newFormData.tanggal_lahir || "",
      alamat: newFormData.alamat || "",
      npwp: newFormData.npwp || "",
    },
  });
  return (
    <div className="w-full p-5">
      <Form {...form}>
        <form action={formAction} className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...formField}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="flex justify-between"
                      autoComplete="off"
                      value={
                        Array.isArray(formField.value)
                          ? JSON.stringify(formField.value)
                          : formField.value || ""
                      }
                      onChange={(e) => {
                        formField.onChange(e);
                        handleChange(e, field.name);
                        updateNewFormDetails({
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors[field.name]?.message ||
                      formState?.[field.name]}
                  </FormMessage>
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#03624C] hover:bg-[#03624C]/80 mt-4"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
