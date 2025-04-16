"use client"

import { Absensi } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const getStatusClass = (status: string) => {
  switch (status) {
    case "Terlambat":
      return "bg-[#FE9595] text-[#BF2323] px-2 py-1 rounded-lg";
    case "Tepat Waktu":
      return "bg-[#A7FAC8] text-[#008205] px-2 py-1 rounded-lg";
    case "Izin":
      return "bg-gray-200 text-gray-700 px-2 py-1 rounded-lg";
    default:
      return "bg-gray-200 text-gray-700 px-2 py-1 rounded-lg";
  }
};

export const absensi: ColumnDef<Absensi>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "masuk",
    header: "Masuk",
  },
  {
    accessorKey: "pulang",
    header: "Pulang",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className={`min-w-[100px] inline-block text-center px-3 py-1 rounded-md text-sm font-medium ${getStatusClass(row.original.status)}`}>{row.original.status}</span>,
  },
];
