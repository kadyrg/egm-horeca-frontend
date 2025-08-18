import { Link } from "@/i18n/navigation";
import { MapPin, Phone } from "lucide-react";
import { Language } from "../shared/language-switcher";
import { TopBarMetadata } from "@/lib/types/types";
import { cn } from "@/lib/utils";

async function TopBar({ metadata } : { metadata: TopBarMetadata }) {
  return (
    <div className="flex flex-col items-center px-3 pt-3 md:pt-[6px]">
      <div className="w-full max-w-7xl flex items-center justify-between">
        <TopBarItem target="_blank" href={metadata.storeLocationURL}>
          <MapPin size={16} />
          {metadata.storeLocation}
        </TopBarItem>
        <div className="flex gap-10">
          <TopBarItem className="hidden sm:flex" href={`tel:${metadata.phone}`}>
            <Phone size={16} />
            {metadata.phone}
          </TopBarItem>
          <Language />
        </div>
      </div>
    </div>
  );
};

function TopBarItem({ className, ...props }: React.ComponentProps<typeof Link>) {
  return <Link className={cn('flex items-center gap-2 hover:text-foreground/70 text-[13px] truncate', className)} {...props} />
};

export { TopBar };
