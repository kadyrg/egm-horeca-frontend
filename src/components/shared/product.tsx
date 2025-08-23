import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Section } from "../ui/section";
import { AddToCart } from "./add-to-cart";
import { getProduct } from "@/lib/api/products";
import { ProductCarousel } from "./product-carousel";
import { cn } from "@/lib/utils";

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
        <ProductCarousel data={data} />
        <div className="max-w-xl w-full">
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
            <div>
              {data.variants.map((item, index) => (
                <div key={index}>
                  <h3>{item.variantTypeName}</h3>
                  <div className="flex gap-[6px] py-2">
                    {item.products.map((subitem, index) => (
                      <Link key={index} href={`/products/${subitem.slug}`} className={cn('border rounded-full py-1 px-3 text-sm font-medium', slug===subitem.slug && 'border-primary bg-primary text-background')}>{subitem.variantName}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
            <p className="text-sm md:text-base whitespace-pre-wrap">{data.description}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export { ProductDetail };
