"use client";

import React, { useState } from "react";
import List from "@/components/ui/list";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const izinData = [
  {
    nama: "John Doe",
    kepentingan: "Acara",
    tanggal: "17 Mar 2025 - 19 Mar 2025",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor sed nibh ut consectetur. Maecenas purus ante, mattis ut dictum sed, pretium et nunc. Maecenas viverra id neque vel tristique.",
  },
];

const IzinPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIzin, setSelectedIzin] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredIzin = izinData.filter((izin) =>
    izin.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (izin: any) => {
    setSelectedIzin(izin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Izin List */}
      {filteredIzin.map((izin, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleOpenModal(izin)}
        >
          <List
            nama={izin.nama}
            kepentingan={izin.kepentingan}
            tanggal={izin.tanggal}
          />
        </div>
      ))}

      {/* Custom Pagination */}
      <div className="mt-4 bg-white p-3 rounded-lg shadow-md border border-gray-300">
      <Pagination>
      <PaginationContent>
        <p>
          Page
        </p>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Izin</DialogTitle>
          </DialogHeader>
          {selectedIzin && (
            <div className="p-4">
              <p>
                <strong>Nama :</strong> {selectedIzin.nama}
              </p>
              <p>
                <strong>Kepentingan :</strong> {selectedIzin.kepentingan}
              </p>
              <p>
                <strong>Tanggal :</strong> {selectedIzin.tanggal}
              </p>
              <p className="mt-2">{selectedIzin.deskripsi}</p>
              <Input type="file" className="mt-4" />
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" onClick={handleCloseModal}>
              Tolak
            </Button>
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              onClick={handleCloseModal}
            >
              Setuju
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IzinPage;
