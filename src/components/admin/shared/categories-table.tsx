"use client";

import { CategoryListView } from "@/lib/types/categories";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { Delete } from "./delete";
import { deleteCategory } from "@/app/actions/categories";
import { CategoryEdit } from "./category-edit";

function CategoriesTable({ data }: { data: CategoryListView[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>English name</TableHead>
          <TableHead>Romanian name</TableHead>
          <TableHead>Product count</TableHead>
          <TableHead className="text-right">Controls</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.nameEn}</TableCell>
            <TableCell>{item.nameRo}</TableCell>
            <TableCell>{item.productCount}</TableCell>
            <TableCell>
              <span className="flex gap-1 float-right">
                <CategoryEdit data={item} />
                <Delete
                  onDelete={() => deleteCategory(item.id)}
                  successMessage={"Category deleted successfully"}
                  failMessage={"Category couldn't be deleted"}
                />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { CategoriesTable };
