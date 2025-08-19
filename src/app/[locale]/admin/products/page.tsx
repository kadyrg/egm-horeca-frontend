import { List } from "@/components/admin/shared/list";
import { ProductAdd } from "@/components/admin/shared/products/product-add";
import { getAllCategoriesAdmin } from "@/lib/api/categories";
import { getProductsAdmin } from "@/lib/api/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { Badge } from "@/components/admin/ui/badge";
import { ProductEdit } from "@/components/admin/shared/products/product-edit";
import { ProductDelete } from "@/components/admin/shared/products/product-delete";
import { Link } from "@/i18n/navigation";

// interface Props {
//   searchParams: Promise<{ page?: string }>;
// }

export default async function ProductsPage() {
  // const { page } = await searchParams;
  const products = await getProductsAdmin();
  const categories = await getAllCategoriesAdmin();

  return (
    <List
      addFeature={<ProductAdd categories={categories} />}
      title={"Products"}
      total={products.total}
      initial={products.initial}
      last={products.last}
      totalPages={products.totalPages}
      page={products.page}
      searchPlaceholder={"Search product..."}
      table={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>English name</TableHead>
              <TableHead>Romanian name</TableHead>
              <TableHead>price</TableHead>
              <TableHead>stock</TableHead>
              <TableHead>status</TableHead>
              <TableHead>Variants count</TableHead>
              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.nameEn}</TableCell>
                <TableCell>{item.nameRo}</TableCell>
                <TableCell>{item.price} lei</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <Badge variant={item.status ? "default" : "destructive"}>
                    {item.status ? "active" : "inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/products/${item.id}/variants`}>
                  <Badge variant={"outline"}>{item.variantsCount} variants</Badge></Link>
                </TableCell>
                <TableCell className="text-right">
                  <span className="flex gap-1 float-right">
                    <ProductEdit product={item} allCategories={categories} />
                    <ProductDelete id={item.id} />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    />
  );
}
