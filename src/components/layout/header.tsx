import { UserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeaderMetadata } from "@/lib/types/metadata";
import { Search } from "../shared/search";
import { Filter } from "../shared/filter";
import { getCategories } from "@/lib/api/categories";
import { CartButton } from "../shared/cart-button";
import { LikeHeaderButton } from "../shared/like-header-button";

async function Header({ metadata }: { metadata: HeaderMetadata }) {
  return (
    <header className="z-50 w-full sticky top-0 bg-background shadow-xs px-3 py-3 md:py-[10px] overflow-hidden">
      <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link
          href={"/"}
          className="hidden sm:block text-lg font-bold whitespace-nowrap"
        >
          {metadata.title}
        </Link>
        <div className="flex items-center w-full max-w-2xl gap-2">
          <Search placeholder={metadata.searchPlaceholder} />
          <Filter />
        </div>
        <div className="hidden sm:flex gap-2 items-center">
          <CartButton />
          <LikeHeaderButton />
          <Link
            href="/profile"
            className="w-10 h-10 hover:bg-secondary flex items-center justify-center rounded-full"
          >
            <UserRound strokeWidth={1.5} size={18} />
          </Link>
        </div>
      </div>
      <Categories />
    </header>
  );
}

async function Categories() {
  const data = await getCategories();

  return (
    <div className="hidden md:flex w-full max-w-7xl mx-auto gap-10">
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/categories/${item.slug}`}
          className="text-[13px] py-[6px] whitespace-nowrap"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export { Header };
