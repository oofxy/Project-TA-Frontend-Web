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
import { izinData } from "@/data/izin";
import { usePathname, useSearchParams } from "next/navigation";

const IzinPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIzin, setSelectedIzin] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const limit = 7;
  const totalPages = Math.ceil(izinData.length / limit);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageLink = (index: number) => `${pathname}?page=${index}`;

  const filteredIzin = izinData.filter((izin) =>
    izin.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (izin: any) => {
    setSelectedIzin(izin);
    setIsModalOpen(true);
  };

  const paginatedIzin = filteredIzin.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {paginatedIzin.map((izin, index) => (
          <a onClick={() => handleOpenModal(izin)} key={index}>
            <List
              nama={izin.nama}
              kepentingan={izin.kepentingan}
              tanggal={izin.tanggal}
            />
          </a>
        ))}
      </div>

      {/* Custom Pagination */}
      <Pagination>
        <PaginationContent>
          <p className="mr-2">Page</p>
          <PaginationItem hidden={currentPage === 1}>
            <PaginationPrevious href={pageLink(currentPage - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={pageLink(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem hidden={currentPage >= totalPages}>
            <PaginationNext href={pageLink(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
