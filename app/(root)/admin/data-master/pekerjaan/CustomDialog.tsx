"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postPekerjaan, patchPekerjaan } from "@/data/data-master/pekerjaan";
import { cn } from "@/lib/utils";
import { dataMasterSchema, DataMasterSchema } from "@/lib/zod";
import { CustomDialogProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CustomDialog({
  id = "",
  initialData = {},
  children,
  mode,
}: CustomDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataMasterSchema>({
    resolver: zodResolver(dataMasterSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (open && initialData?.name) {
      reset({ name: initialData.name });
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data: DataMasterSchema) => {
    setIsSubmitting(true);

    try {
      if (mode === "edit" && id) {
        await patchPekerjaan(id, { name: data.name });
      } else {
        await postPekerjaan({
          name: data.name,
          id: "",
        });
      }

      toast.success(
        `Pekerjaan berhasil ${mode === "add" ? "ditambahkan" : "diperbarui"}`
      );
      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">
            {mode === "add" ? "Tambah Pekerjaan Baru" : "Edit Pekerjaan"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nama Pekerjaan</Label>
              <Input
                id="name"
                placeholder="Masukkan nama pekerjaan"
                {...register("name")}
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-[#17876E] hover:bg-[#17876E]/90",
                "h-11 text-md mt-5",
                "transition-colors duration-200"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  {mode === "add" ? "Menambahkan..." : "Memperbarui..."}
                </span>
              ) : mode === "add" ? (
                "Tambah Pekerjaan"
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
