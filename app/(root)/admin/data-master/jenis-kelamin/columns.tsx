"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";
import toast from "react-hot-toast";
import { deleteJenisKelamin } from "@/data/data-master/jenis-kelamin";
import { useRouter } from "next/navigation";

export const jenisKelamin: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deleteJenisKelamin(data.id);
          toast.success("Jenis Kelamin deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete jenis kelamin");
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
