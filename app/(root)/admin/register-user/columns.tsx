"use client";

import { DataRegisterUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Trash2, UserPen } from "lucide-react";

export const dataRegisterUser: ColumnDef<DataRegisterUser>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "akun",
    header: "Akun",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: () => (
      <div className="flex flex-row gap-2">
        <Trash2 />
        <UserPen />
      </div>
    ),
  },
];
