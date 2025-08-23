import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types/products";
import { LikeButton } from "./like-button";
import { CartItemQuantityControls } from "./cart-item-quantity-controls";
import { CartItemDeleteButton } from "./cart-item-delete-button";
import { CartItemPrice } from "./cart-item-price";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"


function CartItem({
  className,
  data,
}: {
  className?: string;
  data: Product;
}) {
  return (
    <div className={cn("flex gap-3 max-w-2xl border-b last:border-none py-5", className)}>
      <Link href={`/products/${data.slug}`}>
        <Image
          src={data.mainImage}
          width={280}
          height={336}
          alt={data.name}
          className="object-cover w-25 rounded-2xl border aspect-5/6"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-around gap-3">
        <div className="flex items-center justify-between w-full gap-6">
          <h1 className="font-semibold text-[17px] md:text-lg truncate">
            <Link href={`/products/${data.slug}`}>{data.name}</Link>
          </h1>
          <h2 className="md:text-lg text-green-600 font-bold whitespace-nowrap">
            <CartItemPrice productId={data.id} price={data.price} />
          </h2>
        </div>
        <ToggleGroup type="single" className="gap-2">
          <ToggleGroupItem className="rounded-md h-7 text-xs" size={"sm"} value="bold">
            dsf
          </ToggleGroupItem>
          <ToggleGroupItem className="rounded-md h-7" size={"sm"} value="italic">
            ds
          </ToggleGroupItem>
          <ToggleGroupItem className="rounded-md h-7" size={"sm"} value="strikethrough">
            dsf
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <CartItemQuantityControls productId={data.id} />
          </div>
        <div className="gap-2 flex">
          <LikeButton productId={data.id} />
          <CartItemDeleteButton productId={data.id} />
        </div>
        </div>
      </div>
    </div>
  );
}

export { CartItem };

