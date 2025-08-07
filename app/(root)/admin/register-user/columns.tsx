"use client";

import { DataRegisterUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const dataRegisterUser: ColumnDef<DataRegisterUser>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Akun",
  },
  // {
  //   id: "actions",
  //   header: "Edit",
  //   cell: ActionCell,
  // },
];
