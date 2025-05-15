"use client";

import { ChildForm, childSchema } from "@/app/features/onboarding/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { childrenFormAction } from "./actions";
import { FormErrors } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { FormDataRoutes } from "@/lib/utils";
import { Trash2 } from "lucide-react";

const fields: {
  name: keyof ChildForm;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  {
    name: "nama_anak",
    label: "Nama Lengkap Anak",
    type: "text",
    placeholder: "Masukan Nama lengkap anak",
  },
  {
    name: "nik_anak",
    label: "NIK Anak",
    type: "text",
    placeholder: "Masukan NIK Anak",
  },
  {
    name: "tempat_lahir_anak",
    label: "Tempat lahir anak",
    type: "text",
    placeholder: "Masukan Tempat lahir anak",
  },
  {
    name: "tanggal_lahir_anak",
    label: "Tanggal lahir anak",
    type: "date",
    placeholder: "Masukan Tanggal lahir anak",
  },
];

const initialState: FormErrors = {};

export default function Children() {
  const { newFormData, addChild, removeChild } = useFormContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [formState, formAction] = useActionState(
    childrenFormAction,
    initialState
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof ChildForm
  ) => {
    form.setValue(fieldName, e.target.value, { shouldValidate: true });

    if (formState?.[fieldName]) {
      formState[fieldName] = undefined;
    }
  };

  const form = useForm<ChildForm>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      nama_anak: "",
      nik_anak: "",
      tempat_lahir_anak: "",
      tanggal_lahir_anak: "",
    },
  });

  const onSubmit = (data: ChildForm) => {
    addChild(data);
    form.reset();
    toast.success("Anak berhasil ditambahkan!");
    closeDialog();
  };

  return (
    <div className="w-full p-5">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex justify-end w-full">
          <DialogTrigger asChild>
            <Button variant="outline" onClick={openDialog} className="h-10">
              Tambah Data Anak
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Data Anak</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              action={formAction}
              onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
                closeDialog();
              })}
              className="space-y-4"
            >
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
                          onChange={(e) => {
                            formField.onChange(e);
                            handleChange(e, field.name);
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
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#03624C] hover:bg-[#03624C]/80 mt-4"
                  >
                    Next
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {newFormData.children?.length ? (
        <div className="mt-4">
          <h2 className="font-semibold mb-2 text-[18px]">Data Anak:</h2>
          <ul className="space-y-2">
            {newFormData.children.map((child, index) => (
              <li
                key={index}
                className="grid grid-cols-5 items-center p-2 px-4 border rounded-md"
              >
                <div className="flex flex-col font-bold">
                  <p className="font-normal">Nama</p>
                  {child.nama_anak}
                </div>
                <div className="flex flex-col font-bold">
                  <p className="font-normal">NIK</p>
                  {child.nik_anak}
                </div>
                <div className="flex flex-col font-bold">
                  <p className="font-normal">Tempat Lahir</p>
                  {child.tempat_lahir_anak}
                </div>
                <div className="flex flex-col font-bold">
                  <p className="font-normal">Tanggal Lahir</p>
                  {child.tanggal_lahir_anak}
                </div>
                <div className="flex justify-end gap-1">
                  <Trash2
                    className="cursor-pointer hover:text-red-700"
                    onClick={() => {
                      removeChild(index),
                        toast.success("Data berhasil dihapus");
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="flex justify-end">
        <Button
          type="submit"
          onClick={() => {
            redirect(FormDataRoutes.REVIEW_DATA);
          }}
          className="bg-[#03624C] hover:bg-[#03624C]/80 mt-4 h-10 w-30"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
