"use client"

import { deleteCategory } from "@/app/actions/categories";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow
 } from "../../ui/table";
import { DialogDrawer } from "../dialog-drawer";
import { useState } from "react";

function ProductVariants() {
  const [open, setOpen] = useState(false)
  return (
    <DialogDrawer
      title={"Variants of product"}
      isOpen={open}
      onOpenChange={(open) => setOpen(open)}
      trigger={<div>sdas</div>}
      body={
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
              <TableRow>
                <TableCell className="font-medium">dsa</TableCell>
                <TableCell>dsa</TableCell>
                <TableCell>dsa</TableCell>
                <TableCell>dsa</TableCell>
                <TableCell>
                  <span className="flex gap-1 float-right">
                    {/* <Delete
                      onDelete={() => deleteCategory(item.id)}
                      successMessage={"Category deleted successfully"}
                      failMessage={"Category couldn't be deleted"}
                    /> */}
                  </span>
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      }
    />
    
  );
};

export { ProductVariants };
