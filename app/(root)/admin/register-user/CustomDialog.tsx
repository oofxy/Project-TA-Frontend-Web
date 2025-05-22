"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { DataKaryawan } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDown, Loader2 } from "lucide-react";
import { checkUserExists, postRegisterUser } from "@/data/register-user";
import { useRouter } from "next/navigation";
import { FormSchema, userFormSchema } from "@/lib/zod";
import SearchInput from "@/components/SearchInput";

export default function CustomDialog({
  karyawanData,
}: {
  karyawanData: DataKaryawan[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      karyawanId: "",
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const selectedKaryawanId = watch("karyawanId");
  const selectedKaryawan = karyawanData.find(
    (k) => k.id === selectedKaryawanId
  );
  const selectedKaryawanName = selectedKaryawan?.name || "Select Karyawan...";

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);

    try {
      const isDuplicate = await checkUserExists(data.email, data.karyawanId);
      if (isDuplicate) {
        toast.error("User with this email or Karyawan already exists", {});
        return;
      }

      const hashPassword = bcrypt.hashSync(data.password, 10);

      await postRegisterUser({
        selectedKaryawan: data.karyawanId,
        selectedName: data.name,
        selectedEmail: data.email,
        hashPassword,
      });

      toast.success("User successfully registered");
      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKaryawanSelect = (karyawan: DataKaryawan) => {
    setValue("karyawanId", karyawan.id, { shouldValidate: true });
    setValue("name", karyawan.name, { shouldValidate: true });
    setValue("email", karyawan.email, { shouldValidate: true });
    setSearchOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between px-5 pb-6 pt-2">
        <SearchInput />
        <Button onClick={() => setOpen(true)} className="bg-gray-400">Add User</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Register New User
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="karyawan">Karyawan</Label>
                <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between w-full"
                      id="karyawan"
                    >
                      {selectedKaryawanName}
                      <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    side="right"
                    align="start"
                  >
                    <Command className="border ml-1">
                      <CommandInput placeholder="Search Karyawan..." />
                      <CommandList>
                        <CommandEmpty>No Karyawan found.</CommandEmpty>
                        <CommandGroup>
                          {karyawanData.map((karyawan) => (
                            <CommandItem
                              key={karyawan.id}
                              value={karyawan.name}
                              onSelect={() => handleKaryawanSelect(karyawan)}
                              className="cursor-pointer"
                            >
                              {karyawan.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.karyawanId && (
                  <p className="text-sm text-red-500">
                    {errors.karyawanId.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={watch("email")}
                  disabled
                  className="bg-gray-100"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="text"
                  autoComplete="new-password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-[#17876E] hover:bg-[#17876E]/90",
                  "min-w-32 h-11 text-md",
                  "transition-colors duration-200"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Registering...
                  </span>
                ) : (
                  "Register User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
