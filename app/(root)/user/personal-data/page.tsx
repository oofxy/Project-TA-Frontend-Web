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
import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { personalFormAction } from "./actions";
import { FormErrors, FormFieldConfig } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const formFields: FormFieldConfig[] = [
  {
    name: "nama",
    label: "Nama Lengkap",
    type: "text",
    placeholder: "Masukan Nama Lengkap",
    required: true,
  },
  {
    name: "nip",
    label: "NIP",
    type: "text",
    placeholder: "Masukan NIP",
    required: true,
  },
  {
    name: "nik",
    label: "NIK",
    type: "text",
    placeholder: "Masukan NIK",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Masukan Email",
    required: true,
  },
  {
    name: "telephone",
    label: "Nomor Telepon",
    type: "tel",
    placeholder: "Masukan No. Telepon",
    required: true,
  },
  {
    name: "tempat_lahir",
    label: "Tempat Lahir",
    type: "text",
    placeholder: "Masukan Tempat Lahir",
    required: true,
  },
  {
    name: "tanggal_lahir",
    label: "Tanggal Lahir",
    type: "date",
    placeholder: "dd-mm-yyyy",
    required: true,
  },
  {
    name: "alamat",
    label: "Alamat",
    type: "text",
    placeholder: "Masukan Alamat",
    required: true,
  },
  {
    name: "npwp",
    label: "NPWP",
    type: "text",
    placeholder: "Masukan NPWP",
    required: true,
  },
];

const initialState: FormErrors = {};

export default function Personal() {
  const { updateNewFormDetails, newFormData } = useFormContext();
  const [formState, formAction] = useActionState(
    personalFormAction,
    initialState
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    mode: "onChange",
  });

  useEffect(() => {
    if (formState) {
      Object.entries(formState).forEach(([field, message]) => {
        if (message) {
          form.setError(field as keyof NewForm, {
            type: "server",
            message,
          });
        }
      });
    }
  }, [formState, form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof NewForm
  ) => {
    const value = e.target.value;
    form.setValue(fieldName, value, { shouldValidate: true });
    updateNewFormDetails({ [fieldName]: value });

    if (formState?.[fieldName]) {
      form.clearErrors(fieldName);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formAction(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full p-5 max-w-2xl mx-auto">
      <Form {...form}>
        <form action={formAction} onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col gap-6">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {field.label}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...formField}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={cn(
                          "w-full",
                          fieldState.error && "border-red-500"
                        )}
                        autoComplete="off"
                        value={formField.value as string}
                        onChange={(e) => handleChange(e, field.name)}
                        aria-invalid={fieldState.error ? "true" : "false"}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className={cn(
                "bg-[#03624C] hover:bg-[#03624C]/90",
                "min-w-32 h-11 text-md",
                "transition-colors duration-200"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Memproses...
                </span>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
