"use client";

import { Link } from "@/i18n/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, Globe } from "lucide-react";
import { useLocale } from "next-intl";

function Language() {
  const locale = useLocale();

  const data = [
    { name: "English", locale: "en" },
    { name: "Romanian", locale: "ro" },
  ];
  const activeLanguage = data.find((item) => item.locale === locale)?.name;

  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 hover:text-foreground/70 text-[13px] truncate">
        <Globe size={16} strokeWidth={1.2} />
        {activeLanguage}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex flex-col">
        {data.map((item, index) => (
          <Link
            key={index}
            href={"/"}
            locale={item.locale}
            className="py-2 px-1 flex items-center justify-between gap-4"
          >
            {item.name}
            <span className="w-5 h-5">
              {locale === item.locale && (
                <Check className="stroke-blue-600" size={20} />
              )}
            </span>
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export { Language };
