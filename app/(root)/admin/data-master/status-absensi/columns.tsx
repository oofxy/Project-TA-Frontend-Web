"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";
import toast from "react-hot-toast";
import { deleteStatusAbsensi } from "@/data/data-master/status-absensi";
import { useRouter } from "next/navigation";

export const statusAbsensi: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Status Absensi",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deleteStatusAbsensi(data.id);
          toast.success("Status Absensi deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete Status Absensi");
          console.error(error);
        }
      };

      return (
        <div className="flex gap-3">
          <Trash2 className="icon cursor-pointer" onClick={handleDelete} />
          <CustomDialog
            mode="edit"
            id={data.id}
            initialData={{ name: data.name }}
          >
            <Edit className="icon cursor-pointer" />
          </CustomDialog>
        </div>
      );
    },
  },
];
