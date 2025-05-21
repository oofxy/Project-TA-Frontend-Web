"use client";

import { LokasiKantor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const lokasiKantor: ColumnDef<LokasiKantor>[] = [
  {
    accessorKey: "name",
    header: "Lokasi Kantor",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const lokasiKantorData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog lokasiKantor={lokasiKantorData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
