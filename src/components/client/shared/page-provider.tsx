"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  total: number;
};

function PageProvider({ children, total }: Props) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : undefined;
  const router = useRouter();

  useEffect(() => {
    if (
      pageParam !== null &&
      currentPage !== undefined &&
      (Number.isNaN(currentPage) || currentPage < 1 || currentPage > total)
    ) {
      router.push("?page=1");
    }
  }, [pageParam, router]);
  return <>{children}</>;
}

export { PageProvider };
