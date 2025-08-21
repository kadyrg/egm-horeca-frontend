"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useSearchParams } from "next/navigation";

function AppPagination({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${currentPage - 1}`} />
        </PaginationItem>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink href={`?page=${1}`}>1</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {total > 2 && currentPage > total - 1 && currentPage - 2 > 1 && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage - 2}`}>
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href="#">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {total - 1 > currentPage && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage + 1}`}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {total > 3 && currentPage < 2 && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage + 2}`}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < total - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage !== total && (
          <PaginationItem>
            <PaginationLink href={`?page=${total}`}>{total}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={`?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { AppPagination };
