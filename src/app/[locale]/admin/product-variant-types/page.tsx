import { List } from "@/components/admin/shared/list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/admin/ui/table";
import { ProductVariantTypeAdd } from "@/components/admin/shared/product-variant-type-add";
import { getProductVariantTypesAdmin } from "@/lib/api/product-variant-types";
import { ProductVariantTypeDelete } from "@/components/admin/shared/poduct-variant-type-delete";
import { ProductVariantTypeEdit } from "@/components/admin/shared/product-variant-type-edit";

export default async function ProductVariantTypesPage() {
  const productVariantTypes = await getProductVariantTypesAdmin();

  return (
    <List
      addFeature={<ProductVariantTypeAdd />}
      title={"Product Variant Types"}
      total={productVariantTypes.total}
      initial={productVariantTypes.initial}
      last={productVariantTypes.last}
      totalPages={productVariantTypes.totalPages}
      page={productVariantTypes.page}
      searchPlaceholder={"Search product variant type..."}
      table={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>English name</TableHead>
              <TableHead>Romanian name</TableHead>
              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productVariantTypes.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.nameEn}</TableCell>
                <TableCell>{item.nameRo}</TableCell>
                <TableCell className="text-right">
                  <span className="flex gap-1 float-right">
                    <ProductVariantTypeEdit productVariantType={item} />
                    <ProductVariantTypeDelete id={item.id}/>
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
