import { Hero } from "@/components/shared/hero";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/types";
import { getLocale } from "next-intl/server";
import Image from "next/image"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Tops />
      <div className="h-1000"></div>
    </>
  );
};

async function Tops() {
  const locale = await getLocale();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/top`, {
    // cache: "force-cache",
    headers: {
      'Accept-Language': locale
    }
  });
  const data: Product[] = await res.json();

  return (
    <Carousel opts={{ align: "start" }}>
      <Section className="flex items-center justify-between py-4">
          <h1 className="text-xl">Lorem Ipsum</h1>
          <div className="flex gap-2">
            <CarouselPrevious className="static top-0 -left-0 -translate-y-0" />
            <CarouselNext className="static top-0 -right-0 -translate-y-0" />
          </div>
      </Section>
      <CarouselContent className="mx-auto max-w-7xl overflow-visible">
        {data.map((item) => (
          <CarouselItem key={item.id} className="basis-3/7 sm:basis-3/8 md:basis-3/10 lg:basis-3/14 pl-3 xl:pl-0 xl:pr-5">
            <Link href={""}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                width={280}
                height={336}
                alt={item.name}
                className="object-cover rounded-md border aspect-5/6"
              />
            </Link>
            <div className="py-[6px]">
              <h2 className="w-full text-lg md:text-xl font-semibold pt-1">100.99 lei</h2>
              <Link className="w-full text-sm md:text-base py-1 hover:text-primary" href={""}>{item.name}</Link>
            </div>
            <div>
              <Button className="w-full">Add to cart</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
