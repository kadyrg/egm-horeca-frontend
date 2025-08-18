import { Eye } from "lucide-react";
import { Button } from "../ui/button";

function ViewButton({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      size="icon"
      className="w-7 h-7 rounded-full"
      variant="outline"
      {...props}
    >
      <Eye />
    </Button>
  );
};

export { ViewButton };
