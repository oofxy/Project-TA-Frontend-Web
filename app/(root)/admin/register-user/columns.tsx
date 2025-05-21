"use client";

import { deleteUser } from "@/data/register-user";
import { DataRegisterUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const dataRegisterUser: ColumnDef<DataRegisterUser>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Akun",
  },
  {
    id: "actions",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const user = row.original;

      const handleDelete = async () => {
        try {
          await deleteUser(user.id);
          toast.success("User deleted successfully");
          router.push("/admin/register-user");
        } catch (error) {
          toast.error("Failed to delete user");
          console.error(error);
        }
      };

      return (
        <div className="flex flex-row gap-2">
          <button
            onClick={handleDelete}
            className="text-black hover:text-red-700 hover:cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
];
