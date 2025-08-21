
import { FilterForm } from "./filter-form";
import { FilterButton } from "./filter-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

function FilterDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <FilterButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-10">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <FilterForm />
      </DialogContent>
    </Dialog>
  );
}

export { FilterDialog };
