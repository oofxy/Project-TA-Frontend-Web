"use client";

import { Divisi } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const divisi: ColumnDef<Divisi>[] = [
  {
    accessorKey: "name",
    header: "Divisi",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const divisiData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog divisi={divisiData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
