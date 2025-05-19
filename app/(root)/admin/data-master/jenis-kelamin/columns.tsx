"use client";

import { JenisKelamin } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const jenisKelamin: ColumnDef<JenisKelamin>[] = [
  {
    accessorKey: "name",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const jenisKelaminData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog jenisKelamin={jenisKelaminData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
