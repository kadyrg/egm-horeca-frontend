import { BottomNavMetadata } from "@/lib/types/types";
import { BottomNavLinks } from "../shared/links"

function BottomNav({ metadata } : { metadata: BottomNavMetadata }) {
  return (
    <div className="h-[52px] block sm:hidden">
      <nav className="fixed flex bottom-0 bg-background w-full h-[52px] overflow-x-auto">
        <BottomNavLinks metadata={metadata} />
      </nav>
    </div>
  );
};

export { BottomNav };
