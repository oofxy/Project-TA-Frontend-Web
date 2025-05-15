"use client";

import { DataKaryawan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, UserMinus, UserPen } from "lucide-react";

export const dataKaryawan: ColumnDef<DataKaryawan>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telephone",
    header: "Telepon",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const handleMoreData = () => {
        const data = row.original;
        console.log("Data Karyawan:", data);
      };
      return (
        <div className="flex flex-row gap-2">
          <UserMinus
            className="cursor-pointer hover:text-red-700"
            onClick={() => {}}
          />
          <UserPen
            className="cursor-pointer hover:text-yellow-700"
            onClick={() => {}}
          />
          <Ellipsis
            className="cursor-pointer hover:text-green-700"
            onClick={handleMoreData}
          />
        </div>
      );
    },
  },
];
