"use client";

import { StatusAbsensi } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";

export const statusAbsensi: ColumnDef<StatusAbsensi>[] = [
  {
    accessorKey: "name",
    header: "Status Absensi",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const statusAbsensiData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <Trash2 className="icon cursor-pointer" />
          <CustomDialog statusAbsensi={statusAbsensiData} mode="edit">
            <Edit2 className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
