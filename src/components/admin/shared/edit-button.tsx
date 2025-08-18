import { Pencil } from "lucide-react";
import { Button } from "../ui/button";

function EditButton({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      size="icon"
      className="w-7 h-7 rounded-full"
      variant="outline"
      {...props}
    >
      <Pencil />
    </Button>
  );
};

export { EditButton };
