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
import { FormErrors, FormFieldConfig } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { parentsFormAction } from "./actions";

const formFields: FormFieldConfig[] = [
  {
    name: "nama_ayah",
    label: "Nama Lengkap Ayah",
    type: "text",
    placeholder: "Masukan Nama Lengkap Ayah",
  },
  {
    name: "nama_ibu",
    label: "Nama Lengkap Ibu",
    type: "text",
    placeholder: "Masukan Nama Lengkap Ibu",
  },
  {
    name: "alamat_ayah",
    label: "Alamat Ayah",
    type: "text",
    placeholder: "Masukan Alamat ayah",
  },
  {
    name: "alamat_ibu",
    label: "Alamat Ibu",
    type: "text",
    placeholder: "Masukan Alamat Ibu",
  },
];

const initialState: FormErrors = {};

export default function Parents() {
  const { updateNewFormDetails, newFormData } = useFormContext();
  const [formState, formAction] = useActionState(
    parentsFormAction,
    initialState
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewForm>({
    resolver: zodResolver(newFormSchema),
    defaultValues: {
      nama_ayah: newFormData.nama_ayah || "",
      nama_ibu: newFormData.nama_ibu || "",
      alamat_ayah: newFormData.alamat_ayah || "",
      alamat_ibu: newFormData.alamat_ibu || "",
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
          <h1 className="flex gap-1 font-semibold text-2xl">
            Data Orang Tua{" "}
            <span className="font-normal text-[14px] text-red-500">
              (opsional)
            </span>
          </h1>
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
