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
import React, { useActionState, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { childrenFormAction } from "./actions";
import { FormErrors } from "@/types";
import { useFormContext } from "@/app/features/onboarding/context";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormDataRoutes } from "@/lib/utils";
import { Edit, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const fields: {
  name: keyof ChildForm;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}[] = [
  {
    name: "nama_anak",
    label: "Nama Lengkap Anak",
    type: "text",
    placeholder: "Masukan Nama lengkap anak",
    required: true,
  },
  {
    name: "nik_anak",
    label: "NIK Anak",
    type: "text",
    placeholder: "Masukan NIK Anak",
    required: true,
  },
  {
    name: "tempat_lahir_anak",
    label: "Tempat lahir anak",
    type: "text",
    placeholder: "Masukan Tempat lahir anak",
    required: true,
  },
  {
    name: "tanggal_lahir_anak",
    label: "Tanggal lahir anak",
    type: "date",
    placeholder: "Masukan Tanggal lahir anak",
    required: true,
  },
];

const initialState: FormErrors = {};

export default function Children() {
  const router = useRouter();
  const { newFormData, addChild, removeChild, updateChild } = useFormContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<ChildForm>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      nama_anak: "",
      nik_anak: "",
      tempat_lahir_anak: "",
      tanggal_lahir_anak: "",
    },
  });

  const [formState, formAction] = useActionState(
    childrenFormAction,
    initialState
  );

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset();
      setEditingIndex(null);
    }
  }, [isDialogOpen, form]);

  useEffect(() => {
    if (formState) {
      Object.entries(formState).forEach(([field, message]) => {
        if (message && field in form.control._fields) {
          form.setError(field as keyof ChildForm, {
            type: "server",
            message,
          });
        }
      });
    }
  }, [formState, form]);

  const handleEdit = (index: number) => {
    const child = newFormData.children?.[index];
    if (child) {
      form.reset(child);
      setEditingIndex(index);
      setIsDialogOpen(true);
    }
  };

  const handleSubmit = async (data: ChildForm) => {
    setIsSubmitting(true);
    try {
      if (editingIndex !== null) {
        updateChild(editingIndex, data);
        toast.success("Data anak berhasil diperbarui!");
      } else {
        addChild(data);
        toast.success("Anak berhasil ditambahkan!");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Gagal menambahkan data anak");
      console.error("Error adding child:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveChild = (index: number) => {
    removeChild(index);
    toast.success("Data berhasil dihapus");
  };

  return (
    <div className="w-full p-5 max-w-4xl mx-auto">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex justify-end items-center w-full mb-6">
          <DialogTrigger asChild>
            <Button variant="outline" className="h-10">
              Tambah Data Anak
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Data Anak</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField, fieldState }) => (
                    <FormItem>
                      <FormLabel>
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                          className={cn(
                            "flex justify-between",
                            fieldState.error && "border-red-500"
                          )}
                          autoComplete="off"
                          aria-invalid={fieldState.error ? "true" : "false"}
                        />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              ))}
              <DialogFooter>
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
                      Menyimpan...
                    </span>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {newFormData.children?.length ? (
        <div className="mt-6 space-y-4">
          <h2 className="font-semibold text-lg">Daftar Anak</h2>
          <div className="space-y-3">
            {newFormData.children.map((child, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 border rounded-lg shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p className="font-medium">{child.nama_anak}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">NIK</p>
                  <p className="font-medium">{child.nik_anak}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tempat Lahir</p>
                  <p className="font-medium">{child.tempat_lahir_anak}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                  <p className="font-medium">{child.tanggal_lahir_anak}</p>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                    aria-label="Edit data anak"
                    className="size-10"
                  >
                    <Edit className="text-blue-600 hover:text-blue-800" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveChild(index)}
                    aria-label="Hapus data anak"
                    className="size-10"
                  >
                    <Trash2 className="text-red-600 hover:text-red-800" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            Belum ada data anak yang ditambahkan
          </p>
        </div>
      )}

      <div className="flex justify-end mt-8">
        <Button
          onClick={() => router.push(FormDataRoutes.REVIEW_DATA)}
          className={cn(
            "bg-[#03624C] hover:bg-[#03624C]/90",
            "min-w-32 h-11 text-md",
            "transition-colors duration-200"
          )}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
