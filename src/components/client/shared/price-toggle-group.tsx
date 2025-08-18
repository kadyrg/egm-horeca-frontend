import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

function PriceToggleGroup({...props}: React.ComponentProps<typeof ToggleGroup>) {
  return (
    <ToggleGroup
      size="lg"
      className="gap-3 w-full"
      {...props}
    >
      <ToggleGroupItem
        value="price_asc"
        aria-label="Toggle Price Ascending"
        className=""
      >
        Price Ascending
      </ToggleGroupItem>
      <ToggleGroupItem
        value="price_desc"
        aria-label="Toggle Price Descending"
        className=""
      >
        Price Descending
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export { PriceToggleGroup };
