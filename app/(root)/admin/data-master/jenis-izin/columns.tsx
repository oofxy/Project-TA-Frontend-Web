"use client";

import { JenisIzin } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const jenisIzin: ColumnDef<JenisIzin>[] = [
  {
    accessorKey: "name",
    header: "Jenis Izin",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const jenisIzinData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog jenisIzin={jenisIzinData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
