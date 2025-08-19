import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/client/ui/drawer";
import { FilterForm } from "./filter-form";
import { FilterButton } from "./filter-button";

function FilterDrawer({ ...props }: React.ComponentProps<typeof Drawer>) {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>
        <FilterButton />
      </DrawerTrigger>
      <DrawerContent className="p-5">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <FilterForm />
      </DrawerContent>
    </Drawer>
  );
}

export { FilterDrawer };
