"use client";

import { DataKaryawan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, UserMinus, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

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
      const router = useRouter();
      const handleMoreData = () => {
        const data = row.original;
        console.log("Data Karyawan:", data);
        router.push(`/admin/data-karyawan/more/${data.id}`);
      };

      const handleEdit = async () => {
        const data = row.original;
        router.push(`/admin/data-karyawan/edit/${data.id}`);
      };

      return (
        <div className="flex flex-row gap-2">
          <UserMinus
            className="cursor-pointer hover:text-red-700"
            onClick={() => {}}
          />
          <UserPen
            className="cursor-pointer hover:text-yellow-700"
            onClick={handleEdit}
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
