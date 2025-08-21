import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AddToCart } from "./add-to-cart";
import { LikeButton } from "./like-button";
import { Product } from "@/lib/types/products";

function ProductCard({
  className,
  data,
}: {
  className?: string;
  data: Product;
}) {
  return (
    <div className={cn("max-w-70 space-y-1", className)}>
      <Link href={`/products/${data.slug}`}>
        <Image
          src={data.mainImage}
          width={280}
          height={336}
          alt={data.name}
          className="object-cover rounded-2xl border aspect-5/6"
        />
      </Link>
      <div className="py-1 space-y-1 w-full">
        <h1 className="truncate font-semibold md:text-[17px] pt-[6px] truncate w-9/10">
          <Link href={`/products/${data.slug}`}>{data.name}</Link>
        </h1>
        <h2 className="text-lg md:text-xl text-green-600 font-bold">
          {data.price} lei
        </h2>
      </div>
      <div className="flex w-full gap-1 overflow-hidden">
        <div className="w-full">
          <AddToCart productId={data.id} />
        </div>
        <div>
          <LikeButton productId={data.id} />
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
