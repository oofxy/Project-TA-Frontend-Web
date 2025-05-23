"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Edit2, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteJenisIzin } from "@/data/data-master/jenis-izin";

export const jenisIzin: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Jenis Izin",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deleteJenisIzin(data.id);
          toast.success("Jenis Izin deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete jenis izin");
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
