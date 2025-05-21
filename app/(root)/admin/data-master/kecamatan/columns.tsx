"use client";

import { Kecamatan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const kecamatan: ColumnDef<Kecamatan>[] = [
  {
    accessorKey: "name",
    header: "Kecamatan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const kecamatanData = row.original;
      
      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog 
            kecamatan={kecamatanData}
            mode="edit"
          >
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];