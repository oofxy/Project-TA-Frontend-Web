"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { userFormSchema } from "./schema";
import { z } from "zod";
import { DataRegisterKaryawan } from "@/types";
import Header from "@/components/Header";
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
import { ArrowDown } from "lucide-react";
import { checkUserExists, postRegisterUser } from "@/data/register-user";
import { useRouter } from "next/navigation";

type FormSchema = z.infer<typeof userFormSchema>;

export default function CustomDialog({
  karyawanData,
}: {
  karyawanData: DataRegisterKaryawan[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      karyawanId: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const selectedKaryawanId = watch("karyawanId");
  const selectedKaryawanName =
    karyawanData.find((k) => k.id === selectedKaryawanId)?.name ||
    "Select Karyawan...";

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);

    try {
      const isDuplicate = await checkUserExists(data.email, data.karyawanId);
      if (isDuplicate) {
        toast.error("User with this email or Karyawan already exists");
        setLoading(false);
        return;
      }

      const hashPassword = bcrypt.hashSync(data.password, 10);

      const res = await postRegisterUser({
        selectedKaryawan: data.karyawanId,
        selectedName: data.name,
        selectedEmail: data.email,
        hashPassword,
      });

      toast.success("User successfully registered");

      reset();
      setOpen(false);
      router.push("/admin/register-user");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  const handleKaryawanSelect = (karyawan: DataRegisterKaryawan) => {
    setValue("karyawanId", karyawan.id);
    setValue("name", karyawan.name);
    setValue("email", karyawan.email);
    setSearchOpen(false);
  };

  return (
    <div>
      <Header onClick={() => setOpen(true)} buttonLabel="Add User" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register User</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="grid gap-5 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <div className="col-span-3">
                  <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between w-full"
                      >
                        {selectedKaryawanName}
                        <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[280px] border rounded-md"
                      side="right"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search Karyawan..." />
                        <CommandList>
                          <CommandEmpty>No Karyawan found.</CommandEmpty>
                          <CommandGroup>
                            {karyawanData.map((karyawan) => (
                              <CommandItem
                                key={karyawan.id}
                                value={karyawan.name}
                                onSelect={() => handleKaryawanSelect(karyawan)}
                              >
                                {karyawan.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.name && (
                    <p className="col-span-4 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  {...register("email")}
                  disabled
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <div className="col-span-3">
                  <Input
                    id="password"
                    type="password"
                    autoComplete="off"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="col-span-4 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#17876E] hover:bg-[#17876f90]"
              >
                {loading ? "Adding..." : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
