"use client";

import { Pekerjaan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const pekerjaan: ColumnDef<Pekerjaan>[] = [
  {
    accessorKey: "name",
    header: "Pekerjaan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const pekerjaanData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog pekerjaan={pekerjaanData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
