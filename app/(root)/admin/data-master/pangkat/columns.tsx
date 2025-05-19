"use client";

import { Pangkat } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const pangkat: ColumnDef<Pangkat>[] = [
  {
    accessorKey: "name",
    header: "Pangkat",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const pangkatData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog pangkat={pangkatData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
