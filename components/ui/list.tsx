import React from "react";
import { ArrowRight } from "lucide-react";

interface ListProps {
  nama: string;
  kepentingan: string;
  tanggal: string;
}

const List: React.FC<ListProps> = ({ nama, kepentingan, tanggal }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-[#CDF9EF] rounded-lg shadow-md">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Nama</span>
        <span className="font-bold">{nama}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Kepentingan</span>
        <span className="text-black">{kepentingan}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Tanggal</span>
        <span className="text-black">{tanggal}</span>
      </div>
      <ArrowRight className="text-gray-600" />
    </div>
  );
};

export default List;
