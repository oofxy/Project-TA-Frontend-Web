"use client";

import { Agama } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const agama: ColumnDef<Agama>[] = [
  {
    accessorKey: "name",
    header: "Agama",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const agamaData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog agama={agamaData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
