"use client";

import { DataKaryawan } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, UserMinus, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

export const karyawan: ColumnDef<DataKaryawan>[] = [
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
      const handleViewData = () => {
        const data = row.original;
        router.push(`/admin/data-karyawan/view/${data.id}`);
      };

      const handleEdit = async () => {
        const data = row.original;
        router.push(`/admin/data-karyawan/edit/${data.id}`);
      };

      return (
        <div className="flex flex-row gap-2">
          {/* <UserMinus className="cursor-pointer" onClick={() => {}} /> */}
          <UserPen className="cursor-pointer" onClick={handleEdit} />
          <Ellipsis className="cursor-pointer" onClick={handleViewData} />
        </div>
      );
    },
  },
];
