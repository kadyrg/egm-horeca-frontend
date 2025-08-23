import { getBanners } from "@/lib/api/banners";
import { Section } from "../ui/section";
import { BannerCarousel } from "./banner-carousel";

async function Hero() {
  const data = await getBanners();

  return (
    <Section className="aspect-15/7 sm:aspect-15/6 md:aspect-15/5 !py-0">
      <BannerCarousel data={data} />
    </Section>
  );
}

export { Hero };
