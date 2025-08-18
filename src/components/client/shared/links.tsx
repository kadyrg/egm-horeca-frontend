"use client"

import { Link, usePathname } from "@/i18n/navigation";
import { BottomNavMetadata } from "@/lib/types/types";
import { AccountIcon, CartIcon, HeartIcon, HomeIcon, CategoriesIcon } from "../ui/icons"

function BottomNavLinks({ metadata } : { metadata: BottomNavMetadata }) {
  const pathname = usePathname()
  const data = [
    { icon: HomeIcon, name: metadata.home, url: "/" },
    { icon: CategoriesIcon, name: metadata.categories, url: "/categories" },
    { icon: HeartIcon, name: metadata.likes, url: "/likes" },
    { icon: CartIcon, name: metadata.cart, url: "/cart" },
    { icon: AccountIcon, name: metadata.profile, url: "/profile" },
  ]

  return (
    <>
      {data.map((item, index) => (
        <Link
        key={index}
        href={item.url}
        className="flex w-full h-full flex-col items-center justify-center text-[11px] font-medium text-slate-400 px-2"
      >
        <item.icon isActive={pathname === item.url} />
        {item.name}
      </Link>
      ))}
    </>
  );
};

export { BottomNavLinks };
