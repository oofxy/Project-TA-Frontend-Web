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
import { partnerFormAction } from "./actions";
import { FormErrors } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";

const fields: {
  name: keyof NewForm;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "nama_pasangan",
    label: "Nama Lengkap Pasangan",
    type: "text",
    placeholder: "Masukan Nama Lengkap Pasangan",
  },
  {
    name: "tempat_lahir_pasangan",
    label: "Tempat Lahir Pasangan",
    type: "text",
    placeholder: "Masukan Tempat Lahir Pasangan",
  },
  {
    name: "pekerjaan_pasangan",
    label: "Pekerjaan Pasangan",
    type: "text",
    placeholder: "Masukan Pekerjaan Pasangan",
  },
  {
    name: "telephone_pasangan",
    label: "Telepon Pasangan",
    type: "tel",
    placeholder: "Masukan Telepon Pasangan",
  },
];

const initialState: FormErrors = {};

export default function Partner() {
  const { updateNewFormDetails, newFormData } = useFormContext();
  const [formState, formAction] = useActionState(
    partnerFormAction,
    initialState
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof NewForm
  ) => {
    form.setValue(fieldName, e.target.value, { shouldValidate: true });

    if (formState?.[fieldName]) {
      formState[fieldName] = undefined;
    }
  };
  const form = useForm<NewForm>({
    resolver: zodResolver(newFormSchema),
    defaultValues: {
      nama_pasangan: newFormData.nama_pasangan || "",
      tempat_lahir_pasangan: newFormData.tempat_lahir_pasangan || "",
      pekerjaan_pasangan: newFormData.pekerjaan_pasangan || "",
      telephone_pasangan: newFormData.telephone_pasangan || "",
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
              className="bg-[#03624C] hover:bg-[#03624C]/80 mt-4 h-10 w-30"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
