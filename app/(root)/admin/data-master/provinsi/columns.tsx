"use client";

import { Provinsi } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const provinsi: ColumnDef<Provinsi>[] = [
  {
    accessorKey: "name",
    header: "Provinsi",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const provinsiData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog provinsi={provinsiData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
