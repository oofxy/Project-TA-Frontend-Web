"use client";

import { LokasiKerja } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import CustomDialoglokasikerja from "./CustomDialogLokasiKerja";


export const lokasiKerja: ColumnDef<LokasiKerja>[] = [
  {
    accessorKey: "name",
    header: "Lokasi Kerja",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const lokasiKerjaData = row.original;

      return (
        <div className="flex flex-row gap-3">
          <button
            className="icon cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(lokasiKerjaData)}
          >
            <Trash2 />
          </button>
          <CustomDialoglokasikerja lokasiKerja={lokasiKerjaData} mode="edit">
            <button className="icon cursor-pointer" title="Edit">
              <Edit2 />
            </button>
          </CustomDialoglokasikerja>
        </div>
      );
    },
  },
];

const handleDelete = (lokasiKerjaData: LokasiKerja) => {
  // implement delete logic here
};
