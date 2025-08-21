import { getBanners } from "@/lib/api/banners";
import { Section } from "../ui/section";
import { BannerCarousel } from "./banner-carousel";

async function Hero() {
  const data = await getBanners();

  return (
    <Section variant={"fullWidth"} className="aspect-15/4 !py-0">
      <BannerCarousel data={data} />
    </Section>
  );
}

export { Hero };
