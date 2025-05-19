"use client";

import { Kabupaten } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const kabupaten: ColumnDef<Kabupaten>[] = [
  {
    accessorKey: "name",
    header: "Kabupaten",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const kabupatenData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog kabupaten={kabupatenData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
