import { List } from "@/components/admin/shared/list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { ProductEdit } from "@/components/admin/shared/products/product-edit";
import { ProductDelete } from "@/components/admin/shared/products/product-delete";
import { getUsersAdmin } from "@/lib/api/users";
import { Button } from "@/components/admin/ui/button";
import { Eye } from "lucide-react";
import { ViewButton } from "@/components/admin/shared/view-button";

// interface Props {
//   searchParams: Promise<{ page?: string }>;
// }

export default async function ProductsPage() {
  // const { page } = await searchParams;
  const users = await getUsersAdmin();

  return (
    <List
      title={"Users"}
      total={users.total}
      initial={users.initial}
      last={users.last}
      totalPages={users.totalPages}
      page={users.page}
      searchPlaceholder={"Search user..."}
      table={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>Active status</TableHead>
              <TableHead>Verify status</TableHead>
              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>
                  <Badge variant={item.isActive ? "default" : "destructive"}>
                    {item.isActive ? "active" : "inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={item.isVerified ? "default" : "destructive"}>
                    {item.isVerified ? "verified" : "unverified"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className="flex gap-1 float-right">
                    <ViewButton />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    />
  );
};
