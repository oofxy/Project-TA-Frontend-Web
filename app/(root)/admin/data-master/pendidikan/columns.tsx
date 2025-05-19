"use client";

import { Pendidikan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const pendidikan: ColumnDef<Pendidikan>[] = [
  {
    accessorKey: "name",
    header: "Pendidikan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const pendidikanData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog pendidikan={pendidikanData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
