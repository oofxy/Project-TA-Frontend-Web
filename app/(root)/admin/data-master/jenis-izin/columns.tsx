"use client";

import { JenisIzin } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";

export const jenisIzin: ColumnDef<JenisIzin>[] = [
  {
    accessorKey: "name",
    header: "Jenis Izin",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => (
      <div className="flex flex-row gap-3">
        <Trash2 className="icon" />
        <Edit2 className="icon" />
      </div>
    ),
  },
];
