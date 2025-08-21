import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Section } from "../ui/section";
import { Product } from "@/lib/types/products";
import { ProductCard } from "./product-card";

function HorizontalFlexProducts({
  title,
  data,
}: {
  title: string;
  data: Product[];
}) {
  return (
    <Section variant={"fullWidth"}>
      <Carousel
        opts={{ align: "start" }}
        className="space-y-3 sm:space-y-[14px] md:space-y-4 lg:space-y-[18px] xl:space-y-5"
      >
        <div className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="hidden sm:flex gap-2">
              <CarouselPrevious className="static top-0 -left-0 -translate-y-0" />
              <CarouselNext className="static top-0 -right-0 -translate-y-0" />
            </div>
          </div>
        </div>
        <CarouselContent className="mx-auto max-w-7xl overflow-visible">
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-3/7 sm:basis-3/8 md:basis-3/10 lg:basis-3/14 xl:basis-3/16 pl-3 sm:pl-4 xl:pl-0 md:pl-5 lg:pl-6 xl:pr-7"
            >
              <ProductCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}

export { HorizontalFlexProducts };
