"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { TableDataProps } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function TableData<TData, TValue>({
  columns,
  data,
}: TableDataProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const limit = 9;
  const totalPages = Math.ceil(data.length / limit);

  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsClient(true);
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, []);

  const paginatedData = data.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pageLink = (index: number) => `${pathname}?page=${index}`;

  return (
    <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
      {isClient ? (
        <div className="rounded-md h-full flex flex-col justify-between">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

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
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          <Skeleton className="w-full h-20" />
        </div>
      )}
    </div>
  );
}
