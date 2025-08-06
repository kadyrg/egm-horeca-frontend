"use client"

import { MobileVisible } from "../ui/mobile-hidden-visible"
import { AccountIcon, CartIcon, HeartIcon, HomeIcon, CategoriesIcon } from "../ui/icons"
import { Link, usePathname } from "@/i18n/navigation"

const BOTTOM_NAV_HEIGHT = "52px"

function BottomNav() {
  const data = [
    { icon: HomeIcon, name: "Home", url: "/" },
    { icon: CategoriesIcon, name: "Categories", url: "/categories" },
    { icon: HeartIcon, name: "Likes", url: "/likes" },
    { icon: CartIcon, name: "Cart", url: "/cart" },
    { icon: AccountIcon, name: "Account", url: "/account" },
  ]
  const pathname = usePathname()

  return (
    <MobileVisible>
      <div
        style={{"--bottom-nav": BOTTOM_NAV_HEIGHT} as React.CSSProperties}
        className="h-(--bottom-nav)"
      >
        <nav className="fixed flex bottom-0 w-full h-(--bottom-nav) overflow-x-auto">
          {data.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="flex w-full h-full flex-col items-center justify-center text-[11px] font-medium text-slate-400 px-2"
            >
              <item.icon isActive={pathname === item.url} />{item.name}
            </Link>
          ))}
        </nav>
      </div>
    </MobileVisible>
  );
};

export { BottomNav };
