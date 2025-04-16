"use client";

import { DataKaryawan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Trash2, UserPen } from "lucide-react";

export const dataKaryawan: ColumnDef<DataKaryawan>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telepon",
    header: "Telepon",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "agama",
    header: "Agama",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        <Trash2 />
        <UserPen />
        <Ellipsis />
      </div>
    ),
  },
];
