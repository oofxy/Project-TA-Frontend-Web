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
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { workFormAction } from "./actions";
import { FormErrors, FormFieldConfig } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";
import { cn, workFormFields } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkFormProps {
  initialOptions: Record<string, Array<{ value: string; label: string }>>;
}

const initialState: FormErrors = {};

export default function WorkForm({ initialOptions }: WorkFormProps) {
  const { updateNewFormDetails, newFormData } = useFormContext();
  const [formState, formAction] = useActionState(workFormAction, initialState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectOptions, setSelectOptions] = useState(initialOptions);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const form = useForm<NewForm>({
    resolver: zodResolver(newFormSchema),
    defaultValues: {
      pangkat_id: newFormData.pangkat_id || "",
      jabatan_id: newFormData.jabatan_id || "",
      pekerjaan_id: newFormData.pekerjaan_id || "",
      golongan_id: newFormData.golongan_id || "",
      divisi_id: newFormData.divisi_id || "",
      status_id: newFormData.status_id || "",
      lokasi_kantor_id: newFormData.lokasi_kantor_id || "",
      lokasi_kerja_id: newFormData.lokasi_kerja_id || "",
      mulai_tugas: newFormData.mulai_tugas || "",
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

  const handleSelectChange = (value: string, fieldName: keyof NewForm) => {
    form.setValue(fieldName, value, { shouldValidate: true });
    updateNewFormDetails({ [fieldName]: value });

    if (formState?.[fieldName]) {
      form.clearErrors(fieldName);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-5 max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <h1 className="flex gap-1 font-semibold text-2xl">Data Personal </h1>
          <div className="flex flex-col gap-6">
            {workFormFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {field.label}
                      {field && <span className="text-red-500">*</span>}
                    </FormLabel>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={(value) => {
                          handleSelectChange(value, field.name);
                        }}
                        value={formField.value as string}
                        disabled={isLoadingOptions}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "w-full",
                              fieldState.error && "border-red-500"
                            )}
                          >
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectOptions[field.name]?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
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
                    )}
                    <FormMessage />
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
              disabled={isSubmitting || isLoadingOptions}
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
