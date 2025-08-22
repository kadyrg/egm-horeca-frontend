"use client"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { LikeButton } from "./like-button";
import { ImageZoom } from "../ui/image-zoom";
import { ProductDetail } from "@/lib/types/products";
import * as React from "react";

function ProductCarousel({data}: {data: ProductDetail}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="w-full max-w-xl flex flex-col aspect-square lg:flex-row-reverse gap-2">
      <Carousel setApi={setApi} className="flex-1  aspect-5/6 flex flex-col gap-3 items-end sm:flex-row sm:items-start">
        <div className="relative h-full bg-slate-50 border rounded-2xl overflow-hidden">
          <CarouselContent>
            {data.images.map((item, index) => (
              <CarouselItem key={index}>
                <ImageZoom>
                  <Image
                    src={item}
                    width={1000}
                    height={1200}
                    alt={data.name}
                    className="rounded-2xl object-cover"
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
      <div className="grid grid-cols-7 lg:grid-cols-1 lg:grid-rows-7 gap-2">
        {data.images.map((item, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`aspect-5/6 rounded-md overflow-hidden border-1 transition-opacity ${
              current === index + 1 ? "opacity-100 border-primary" : "opacity-50 border-transparent"
            }`}
          >
            <Image
              src={item}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export { ProductCarousel }
