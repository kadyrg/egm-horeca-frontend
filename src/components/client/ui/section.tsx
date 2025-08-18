import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority"

const sectionVariants = cva(
  "first:mt-[6px] last:mb-[6px] py-[6px] sm:first:mt-2 sm:last:mb-2 sm:py-2 md:first:mt-[10px] md:last:mb-[10px] md:py-[10px] lg:first:mt-3 lg:last:mb-3 lg:py-3 xl:first:mt-[14px] xl:last:mb-[14px] xl:py-[14px]",
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
    <div className={`${variant ===  "fullWidth" ? '' : 'px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7'}`}>
      <section
        className={cn(sectionVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
};

export { Section };
