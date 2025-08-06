import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority"

const sectionVariants = cva(
  "",
  {
    variants: {
      variant: {
        default:
          "max-w-7xl mx-auto",
        fullWidth:
          ""
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Section({
  className,
  variant,
  ...props
} : React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants>
  ){
  return (
    <div className="px-3">
      <section
        className={cn(sectionVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
};

export { Section }
