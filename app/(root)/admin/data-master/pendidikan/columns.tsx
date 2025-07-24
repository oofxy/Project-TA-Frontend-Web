"use client";

import { DataMaster } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const pendidikan = ({
  fetchData,
  handleEdit,
}: {
  fetchData: () => Promise<void>;
  handleEdit: (item: DataMaster) => void;
}): ColumnDef<DataMaster>[] => [
  {
    accessorKey: "name",
    header: "Pendidikan",
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;

      const handleDelete = async () => {
        try {
          const res = await fetch(`/api/data/data-master/pendidikan/${data.id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Failed to delete");

          toast.success("Pendidikan deleted successfully");
          await fetchData();
          router.refresh();
        } catch (error) {
          toast.error("Failed to delete pendidikan");
          console.error(error);
        }
      };

      return (
        <div className="flex gap-3">
          <Trash2 className="icon cursor-pointer" onClick={handleDelete} />
          <Edit
            className="icon cursor-pointer"
            onClick={() => handleEdit(data)}
          />
        </div>
      );
    },
  },
];
