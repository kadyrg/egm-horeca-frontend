import { Link } from "@/i18n/navigation";

const items = [
  {
    title: "EGm HORECA<",
    links: [
      { title: "text-base", url: "#" },
      { title: "text-base", url: "#" },
      { title: "text-base", url: "#" },
      { title: "text-base", url: "#" },
    ],
  },
  {
    title: "EGm HORECA<",
    links: [
      { title: "text-base", url: "#" },
      { title: "text-base", url: "#" },
      { title: "text-base", url: "#" },
      { title: "text-base", url: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Contact", url: "#" },
      { title: "Contact", url: "#" },
      { title: "Contact", url: "#" },
      { title: "text-base", url: "#" },
    ],
  },
  {
    title: "Info",
    links: [
      { title: "About", url: "#" },
      { title: "Career", url: "#" },
      { title: "Sustainibility", url: "#" },
      { title: "text-base", url: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="px-3 py-2 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 !text-sm py-8">
          {items.map((item, index) => (
            <div className="space-y-2" key={index}>
              <h3 className="font-bold uppercase">{item.title}</h3>
              <ul className="flex flex-col gap-2">
                {item.links.map((i, index) => (
                  <Link
                    className="text-slate-600 hover:text-foreground"
                    key={index}
                    href={i.url}
                  >
                    {i.title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="relative text-sm w-full py-3 flex flex-col sm:flex-row flex-wrap gap-1 justify-between">
          <div className="flex gap-2 flex-wrap">
            <div className="text-slate-600 pr-16">
              Copyright 2025 All rights reserved
            </div>
            <div className="flex gap-5">
              <Link href={"/privacy"} className="hover:underline">
                Privacy Policy
              </Link>
              |
              <Link href={"/terms"} className="hover:underline">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="">All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
