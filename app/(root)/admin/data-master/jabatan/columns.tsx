"use client";

import { Jabatan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialogJabatan from "./CustomDialogJabatan";


export const jabatan: ColumnDef<Jabatan>[] = [
  {
    accessorKey: "name",
    header: "Jabatan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const jabatanData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialogJabatan jabatan={jabatanData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialogJabatan>
        </div>
      );
    },
  },
];
