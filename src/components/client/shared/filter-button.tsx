import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";

function FilterButton({ ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="w-10 h-10"
      {...props}
    >
      <SlidersHorizontal strokeWidth={3} />
    </Button>
  );
};

export { FilterButton };
