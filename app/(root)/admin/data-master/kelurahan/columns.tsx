"use client";

import { Kelurahan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const kelurahan: ColumnDef<Kelurahan>[] = [
  {
    accessorKey: "name",
    header: "Kelurahan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const kelurahanData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog kelurahan={kelurahanData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
