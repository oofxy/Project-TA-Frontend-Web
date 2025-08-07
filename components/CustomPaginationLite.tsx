import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPaginationLite({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <Pagination className="w-full justify-end bg-[#F5F5F5] rounded-md p-2 mt-4">
      <PaginationContent className="space-x-2">
        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(1)}
            disabled={page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem className="text-sm font-medium px-2">
          {page} of {totalPages}
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
