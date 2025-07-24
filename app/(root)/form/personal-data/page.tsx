"use client";

import {
  NewForm,
  newFormSchema,
  MyPersonalForm,
  personalSchema,
} from "@/app/features/onboarding/schema";
import { useFormContext } from "@/app/features/onboarding/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useState } from "react";
import { personalFormAction } from "./actions";
import { FormErrors } from "@/types";
import { cn, personalFormFields } from "@/lib/utils";
import toast from "react-hot-toast";
import { WilayahSelector } from "@/components/WilayahSelector";
import { fetchWithRetry } from "@/lib/fetchWithRetry";

const initialState: FormErrors = {};

export default function PersonalDataPage() {
  const { updateNewFormDetails, newFormData, dataLoaded } = useFormContext();
  const [formState, formAction] = useActionState(
    personalFormAction,
    initialState
  );
  const [selectOptions, setSelectOptions] = useState<
    Record<string, Array<{ value: string; label: string }>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const form = useForm<MyPersonalForm>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      nama: newFormData.nama || "",
      nip: newFormData.nip || "",
      nik: newFormData.nik || "",
      email: newFormData.email || "",
      telephone: newFormData.telephone || "",
      tempat_lahir: newFormData.tempat_lahir || "",
      tanggal_lahir: newFormData.tanggal_lahir || "",
      alamat: newFormData.alamat || "",
      provinsi_id: newFormData.provinsi_id || "",
      kabupaten_id: newFormData.kabupaten_id || "",
      kecamatan_id: newFormData.kecamatan_id || "",
      kelurahan_id: newFormData.kelurahan_id || "",
      npwp: newFormData.npwp || "",
      agama_id: newFormData.agama_id || "",
      pendidikan_id: newFormData.pendidikan_id || "",
      jenis_kelamin_id: newFormData.jenis_kelamin_id || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetchWithRetry(() =>
          fetch("/api/data/submit-form", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          })
        );

        if (!res.ok) throw new Error("Gagal ambil data");

        const data = await res.json();
        setSelectOptions(data);
      } catch (err) {
        toast.error("Gagal memuat data pilihan");
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchOptions();
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
          form.setError(field as keyof MyPersonalForm, {
            type: "server",
            message,
          });
        }
      });
    }
  }, [formState, form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof MyPersonalForm
  ) => {
    const value = e.target.value;
    form.setValue(fieldName, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    updateNewFormDetails({ [fieldName]: value });

    if (formState?.[fieldName]) {
      form.clearErrors(fieldName);
    }
  };

  const handleSelectChange = (
    value: string,
    fieldName: keyof MyPersonalForm
  ) => {
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

  const handleSubmit = async (data: MyPersonalForm) => {
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

  if (isLoadingOptions) {
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
            {personalFormFields
              .filter(
                (field) =>
                  ![
                    "provinsi_id",
                    "kabupaten_id",
                    "kecamatan_id",
                    "kelurahan_id",
                  ].includes(field.name)
              )
              .map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof MyPersonalForm}
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
                              field.name as keyof MyPersonalForm
                            )
                          }
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
                              handleChange(
                                e,
                                field.name as keyof MyPersonalForm
                              )
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

            <WilayahSelector />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className={cn(
                "bg-[#03624C] hover:bg-[#03624C]/90",
                "min-w-32 h-11 text-md transition-colors duration-200"
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
