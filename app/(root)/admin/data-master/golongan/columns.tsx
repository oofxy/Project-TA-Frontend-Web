"use client";

import { Golongan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const golongan: ColumnDef<Golongan>[] = [
  {
    accessorKey: "name",
    header: "Golongan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const golonganData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog golongan={golonganData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
