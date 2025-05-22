"use client";

import { deleteAgama } from "@/data/data-master/agama";
import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomDialog from "./CustomDialog";

export const agama: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Agama",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deleteAgama(data.id);
          toast.success("Agama deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete agama");
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
