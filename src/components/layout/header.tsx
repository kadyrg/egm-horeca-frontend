import { Heart, UserRound } from "lucide-react";
import { ShoppingBagIcon } from "../ui/icons"
import { MobileHidden } from "../ui/mobile-hidden-visible"
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Search as SearchIcon } from "lucide-react"
import { Input } from "../ui/input";

type Category = {
  id: number;
  name: string;
}

type Props = {
  title: string
}

async function Header({ title }: Props) {
  const t = await getTranslations("Header")

  return (
    <header className="z-50 w-full sticky top-0 flex flex-col gap-[6px] items-center bg-background shadow-xs px-3 py-3 md:py-[6px] overflow-hidden">
      <div className="w-full h-full max-w-7xl flex items-center justify-between gap-4">
        <MobileHidden>
          <Link className="text-lg font-bold whitespace-nowrap" href={"/"}>{title}</Link>
        </MobileHidden>
        <Search placeholder={t("searchPlaceholder")} />
        <MobileHidden>
        <div className="flex gap-2 items-center">
          <ShoppingCart />
          <div className="w-9 h-9 hover:bg-secondary flex items-center justify-center rounded-full">
            <Heart strokeWidth={1.5} size={18} />
          </div>
          <div className="w-9 h-9 hover:bg-secondary flex items-center justify-center rounded-full">
            <UserRound strokeWidth={1.5} size={18} />
          </div>
        </div>
        </MobileHidden>
      </div>
      <Categories />
    </header>
  );
};

async function Categories() {
  const locale = await getLocale();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
    cache: "force-cache",
    headers: {
      'Accept-Language': locale
    }
  });
  const data: Category[] = await res.json();

  return (
    <MobileHidden>
      <div className="w-full max-w-7xl  flex gap-10">
        {data.map((item) => (
          <Link key={item.id} href={'dsa'} className="text-sm py-[6px] whitespace-nowrap">
            {item.name}
          </Link>
        ))}
      </div>
    </MobileHidden>
  );
};

function ShoppingCart() {
  return (
    <div className="w-9 h-9 hover:bg-secondary flex items-center justify-center rounded-full">
      <ShoppingBagIcon />
    </div>
  );
};

function Search({ ...props }: React.ComponentProps<typeof Input>) {
  return (
    <div className="relative flex items-center w-full max-w-3xl">
      <label htmlFor="search" className="absolute left-0 h-10 w-10 md:h-9 md:w-9 flex items-center justify-center text-muted-foreground">
        <SearchIcon size={20} />
      </label>
      <Input id="search" type="text" className="pl-10 md:pl-9 h-10 md:h-9 shadow-none" {...props} />
    </div>
  );
};

export { Header };
