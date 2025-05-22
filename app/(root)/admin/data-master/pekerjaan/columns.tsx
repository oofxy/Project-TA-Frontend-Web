"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import CustomDialog from "./CustomDialog";
import toast from "react-hot-toast";
import { deletePekerjaan } from "@/data/data-master/pekerjaan";
import { useRouter } from "next/navigation";

export const pekerjaan: ColumnDef<DataMaster>[] = [
  {
    accessorKey: "name",
    header: "Pekerjaan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const handleDelete = async () => {
        try {
          await deletePekerjaan(data.id);
          toast.success("Pekerjaan deleted successfully");
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete Pekerjaan");
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
