import { List } from "@/components/admin/shared/list";
import { ProductVariantsAdd } from "@/components/admin/shared/products/product-variants-add";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { getProductVariantTypesAll } from "@/lib/api/product-variant-types";
import { getProductVariantsByProductId } from "@/lib/api/product-variants";

interface Props {
  params: Promise<{ productId: number }>;
}

export default async function ProductVariantsPage({params}: Props) {
  const { productId } = await params;
  const productVariantTypesAll = await getProductVariantTypesAll()
  const productVariants = await getProductVariantsByProductId(productId)

  return (
    <List
      addFeature={<ProductVariantsAdd productId={productId} productVariantTypesAll={productVariantTypesAll} />}
      title={"Variants of product"}
      total={10}
      initial={10}
      last={10}
      totalPages={10}
      page={10}
      searchPlaceholder={"Search product variants..."}
      table={
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>English name</TableHead>
              <TableHead>Romanian name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productVariants.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.nameEn}</TableCell>
                <TableCell>{item.nameRo}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>{item.price}</TableCell>
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
            ))}
            
          </TableBody>
        </Table>
      }
    />
  );
}
