"use client";

import { StatusAbsensi } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";

export const statusAbsensi: ColumnDef<StatusAbsensi>[] = [
  {
    accessorKey: "statusAbsensi",
    header: "Status Absensi",
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
