"use client"

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";
import { Banner } from "@/lib/types/banner";

function BannerCarousel({data}: {data: Banner[]}) {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <Carousel opts={{align: "start", loop: true}} plugins={[plugin.current]} className="overflow-hidden border-1 rounded-md">
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <Image src={item.image} width={1920} height={512} className='w-full aspect-15/7 sm:aspect-15/6 md:aspect-15/5 object-cover overflow-hidden rounded-md' alt="image" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export { BannerCarousel };
