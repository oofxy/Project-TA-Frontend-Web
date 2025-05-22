"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";
import toast from "react-hot-toast";
import { deleteKecamatan } from "@/data/data-master/kecamatan";
import { useRouter } from "next/navigation";

export const kecamatan: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Kecamatan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deleteKecamatan(data.id);
          toast.success("Kecamatan deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete kecamatan");
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
