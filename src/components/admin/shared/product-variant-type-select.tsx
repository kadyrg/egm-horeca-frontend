
import { Select ,SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,} from "../ui/select";
import { ProductVariantTypesListView } from "@/lib/types/product-variant-types";

function ProductVariantTypeSelect({
  data,
  ...props
}: React.ComponentProps<typeof Select> & {
  data: ProductVariantTypesListView[];
}) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select product variant type" />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.nameEn}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { ProductVariantTypeSelect };
