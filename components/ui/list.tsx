import React from "react";
import { ArrowRight } from "lucide-react";

interface ListProps {
  nama: string;
  kepentingan: string;
  tanggal: string;
  terverifikasi: string;
}

const List: React.FC<ListProps> = ({
  nama,
  kepentingan,
  tanggal,
  terverifikasi,
}) => {
  return (
    <div className="grid grid-cols-4 items-center px-4 py-3.5 bg-white rounded-lg cursor-pointer">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Nama</span>
        <span className="text-black font-semibold">{nama}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Alasan</span>
        <span className="text-black font-semibold">{kepentingan}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Tanggal</span>
        <span className="text-black font-semibold">{tanggal}</span>
      </div>
      <div className="flex justify-end items-center">
        <ArrowRight className="text-gray-600" />
      </div>
    </div>
  );
};

export default List;
