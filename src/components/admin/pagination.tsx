"use client"

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function AdminPagination({
  initial,
  last,
  total,
  totalPages,
  page
} : {
  initial: number;
  last: number;
  total: number;
  totalPages: number;
  page: number
}) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-slate-500">{initial}-{last} of {total}</span>
      <div className="flex">
        <Link
          href={`${pathname}/?page=${page-1}`}
          className={`${page <= 1 && 'pointer-events-none'}`}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-100 rounded-full"
          >
            <ChevronLeft strokeWidth={2.5} />
          </Button>
        </Link>
        <Link
          href={`${pathname}/?page=${page+1}`}
          className={`${page >= totalPages && 'pointer-events-none'}`}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-slate-100 rounded-full"
          >
            <ChevronRight strokeWidth={2.5} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { AdminPagination };
