"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";
import { useRouter } from "next/navigation";
import { deleteJabatan } from "@/data/data-master/jabatan";
import toast from "react-hot-toast";

export const jabatan: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Jabatan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deleteJabatan(data.id);
          toast.success("Jabatan deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete jabatan");
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
