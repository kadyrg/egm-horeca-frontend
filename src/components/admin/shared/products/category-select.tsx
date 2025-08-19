import { CategoryListViewAll } from "@/lib/types/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

function CategorySelect({
  categories,
  ...props
}: React.ComponentProps<typeof Select> & {
  categories: CategoryListViewAll[];
}) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.nameEn}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { CategorySelect };
