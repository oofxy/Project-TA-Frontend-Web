"use client";

import { useEffect, useState } from "react";
import { MyChildForm, childSchema } from "@/app/features/onboarding/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/app/features/onboarding/context";
import { childrenFormFields, FormDataRoutes } from "@/lib/utils";
import { Loader2, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ChildrenFormPage() {
  const router = useRouter();
  const { newFormData, addChild, removeChild, updateChild } = useFormContext();

  const [selectOptions, setSelectOptions] = useState<
    Record<string, Array<{ value: string; label: string }>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<MyChildForm>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      name: "",
      nik: "",
      jenis_kelamin_id: "",
      tempat_lahir: "",
      tanggal_lahir: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    fetch("/api/data/submit-form")
      .then((res) => res.json())
      .then((data) => setSelectOptions(data))
      .catch(() => toast.error("Gagal ambil data select options"));
  }, []);

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset();
      setEditingIndex(null);
    }
  }, [isDialogOpen, form]);

  const handleEdit = (index: number) => {
    const child = newFormData.children?.[index];
    if (child) {
      form.reset(child);
      setEditingIndex(index);
      setIsDialogOpen(true);
    }
  };

  const handleRemoveChild = (index: number) => {
    removeChild(index);
    toast.success("Data berhasil dihapus");
  };

  const handleSubmit = async (data: MyChildForm) => {
    setIsSubmitting(true);
    try {
      const result = childSchema.safeParse(data);
      if (!result.success) {
        toast.error("Tolong lengkapi semua field yang diperlukan");
        return;
      }

      if (editingIndex !== null) {
        updateChild(editingIndex, data);
        toast.success("Data anak diperbarui!");
      } else {
        addChild(data);
        toast.success("Data anak ditambahkan!");
      }

      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Gagal memproses data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-5 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="flex gap-1 font-semibold text-2xl">
          Data Anak{" "}
          <span className="text-sm text-red-500 font-normal">(opsional)</span>
        </h1>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          Tambah Data Anak
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Form Data Anak</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {childrenFormFields.map((field) => (
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
                      {field.type === "select" ? (
                        <Select
                          value={formField.value}
                          onValueChange={formField.onChange}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={
                                fieldState.error ? "border-red-500" : ""
                              }
                            >
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectOptions[field.name]?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <FormControl>
                          <Input
                            {...formField}
                            placeholder={field.placeholder}
                            type={field.type}
                            className={fieldState.error ? "border-red-500" : ""}
                          />
                        </FormControl>
                      )}
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              ))}
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#03624C] hover:bg-[#03624C]/90 min-w-32 h-11"
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
                  <p className="font-medium">{child.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">NIK</p>
                  <p className="font-medium">{child.nik}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tempat Lahir</p>
                  <p className="font-medium">{child.tempat_lahir}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                  <p className="font-medium">{child.tanggal_lahir}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit className="text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveChild(index)}
                  >
                    <Trash2 className="text-red-600" />
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

      {/* Tombol Next */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={() => router.push(FormDataRoutes.REVIEW_DATA)}
          className="bg-[#03624C] hover:bg-[#03624C]/90 min-w-32 h-11"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
