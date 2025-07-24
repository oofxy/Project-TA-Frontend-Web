"use client";

import {
  NewForm,
  newFormSchema,
  MyWorkForm,
  workSchema,
} from "@/app/features/onboarding/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useState } from "react";
import { workFormAction } from "./actions";
import { useFormContext } from "@/app/features/onboarding/context";
import { cn, workFormFields } from "@/lib/utils";
import toast from "react-hot-toast";
import { fetchWithRetry } from "@/lib/fetchWithRetry";

export default function PersonalDataPage() {
  const { updateNewFormDetails, newFormData, dataLoaded } = useFormContext();
  const [selectOptions, setSelectOptions] = useState<
    Record<string, Array<{ value: string; label: string }>>
  >({});
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [formState, formAction] = useActionState(workFormAction, {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MyWorkForm>({
    resolver: zodResolver(workSchema),
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
    const fetchSelectOptions = async () => {
      try {
        const res = await fetchWithRetry(() => fetch("/api/data/submit-form"));
        if (!res.ok) throw new Error("Gagal fetch select data");
        const data = await res.json();
        setSelectOptions(data);
      } catch (err) {
        toast.error("Gagal memuat data form");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchSelectOptions();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      form.reset(newFormData);
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (formState) {
      Object.entries(formState).forEach(([field, message]) => {
        if (message) {
          form.setError(field as keyof MyWorkForm, {
            type: "server",
            message,
          });
        }
      });
    }
  }, [formState, form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof MyWorkForm
  ) => {
    const value = e.target.value;
    form.setValue(fieldName, value, { shouldValidate: true });
    updateNewFormDetails({ [fieldName]: value });

    if (formState?.[fieldName]) {
      form.clearErrors(fieldName);
    }
  };

  const handleSelectChange = (value: string, fieldName: keyof MyWorkForm) => {
    const selectedOption = selectOptions[fieldName]?.find(
      (opt) => opt.value === value
    );

    form.setValue(fieldName, value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    updateNewFormDetails({
      [fieldName]: value,
      [`${fieldName.replace("_id", "_nama")}`]: selectedOption?.label ?? "",
    });

    if (formState?.[fieldName]) {
      form.clearErrors(fieldName);
    }
  };

  const handleSubmit = async (data: MyWorkForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingOptions) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full p-5 max-w-2xl mx-auto">
      <Form {...form}>
        <form
          action={formAction}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <h1 className="flex gap-1 font-semibold text-2xl">Data Personal</h1>
          <div className="flex flex-col gap-6">
            {workFormFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof MyWorkForm}
                render={({ field: formField, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      {field.label}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    {field.type === "select" ? (
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange(
                            value,
                            field.name as keyof MyWorkForm
                          )
                        }
                        value={formField.value as string}
                        disabled={loadingOptions}
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
                          {selectOptions[field.name]?.length ? (
                            selectOptions[field.name].map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm italic text-muted-foreground">
                              Data belum tersedia
                            </div>
                          )}
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
                          onChange={(e) =>
                            handleChange(e, field.name as keyof MyWorkForm)
                          }
                          aria-invalid={fieldState.error ? "true" : "false"}
                        />
                      </FormControl>
                    )}
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
                "min-w-32 h-11 text-md transition-colors duration-200"
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
