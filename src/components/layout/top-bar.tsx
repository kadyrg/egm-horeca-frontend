import { MobileHidden } from "../ui/mobile-hidden-visible"
import { Link } from "@/i18n/navigation";
import { Check, Globe, MapPin, Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getLocale } from "next-intl/server";

type StoreLocation = {
  name: string;
  url: string;
};

type StoreMetaData = {
  location: StoreLocation;
  phone: string;
}

async function TopBar() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metadata/store_metadata`, {
    cache: "force-cache",
  });
  const data: StoreMetaData = await res.json();
  
  return (
    <div className="flex flex-col items-center px-3 pt-3 md:pt-[6px]">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <TopBarItem target="_blank" href={data.location.url}>
          <MapPin size={17} />
          {data.location.name}
        </TopBarItem>
        <div className="flex gap-10">
          <MobileHidden>
          <TopBarItem href={`tel:${data.phone}`}>
            <Phone size={17} />
            {data.phone}
          </TopBarItem>
        </MobileHidden>
        <Language />
        </div>
      </div>
    </div>
  );
};

async function Language() {
  const locale = await getLocale()
  const data = [
    { name: "English", locale: "en" },
    { name: "Romanian", locale: "ro" },
  ]
  const activeLanguage = data.find((item) => item.locale === locale)?.name;

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 hover:text-foreground/70 font-medium text-sm truncate">
        <Globe size={17} />
        {activeLanguage}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col">
        {data.map((item, index) => (
          <Link
            key={index}
            href='.'
            locale={item.locale}
            className="py-2 px-1 flex items-center justify-between gap-4">
              {item.name}
              <span className="w-5 h-5">
                {locale === item.locale && <Check className="stroke-blue-600" size={20} />}
              </span>
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

function TopBarItem({ ...props }: React.ComponentProps<typeof Link>) {
  return <Link className="flex items-center gap-2 hover:text-foreground/70 font-medium text-sm truncate" {...props} />
};

export { TopBar };
