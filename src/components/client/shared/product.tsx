import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/client/ui/carousel";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/client/ui/button";
import { Section } from "../ui/section";
import { AddToCart } from "./add-to-cart";
import { getProduct } from "@/lib/api/products";
import { LikeButton } from "./like-button";
import { ImageZoom } from "@/components/client/ui/image-zoom";

async function ProductDetail({
  slug,
  description,
  checkoutNow,
}: {
  slug: string;
  description: string;
  addToCart: string;
  checkoutNow: string;
}) {
  const data = await getProduct({ slug: slug });

  return (
    <Section>
      <div className="mx-auto flex flex-col max-w-100 md:max-w-none md:flex-row justify-between gap-3 md:gap-6 xl:gap-9">
        <Carousel className="max-w-lg flex flex-col gap-3 items-end sm:flex-row sm:items-start md:w-1/2">
          <div className="relative h-full bg-slate-50 border rounded-2xl overflow-hidden">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <ImageZoom>
                    <Image
                      src={`${process.env.BACKEND_URL}/${data.mainImage}`}
                      width={1000}
                      height={1200}
                      alt={data.name}
                      className="rounded-2xl aspect-5/6 object-cover"
                    />
                  </ImageZoom>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute right-4 bottom-4 flex gap-1">
              <CarouselPrevious className="static top-0 -left-0 -translate-y-0" />
              <CarouselNext className="static top-0 -right-0 -translate-y-0" />
            </div>
            <LikeButton
              className="absolute top-4 right-4"
              productId={data.id}
            />
          </div>
        </Carousel>
        <div className="max-w-xl md:w-1/2">
          <div className="border-b">
            <Link
              href={`/categories/${data.category.slug}`}
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              {data.category.name}
            </Link>
            <h1 className="text-xl md:text-2xl font-semibold">{data.name}</h1>
            <h2 className="text-xl md:text-2xl font-semibold py-2 text-green-600">
              {data.price} lei
            </h2>
            <div className="flex gap-2 pt-2 py-4">
              <div className="basis-5/9">
                <AddToCart productId={data.id} />
              </div>
              <div className="basis-4/9">
                <Button
                  className="w-full border-primary rounded-full text-primary hover:text-primary"
                  variant={"outline"}
                >
                  {checkoutNow}
                </Button>
              </div>
            </div>
          </div>
          <div className="py-4 space-y-1">
            <h3 className="font-semibold md:text-lg">{description}</h3>
            <p className="text-sm md:text-base">{data.description}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export { ProductDetail };
