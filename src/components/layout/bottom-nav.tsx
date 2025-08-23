import { BottomNavMetadata } from "@/lib/types/metadata";
import { BottomNavLinks } from "../shared/links";

function BottomNav({ metadata }: { metadata: BottomNavMetadata }) {
  return (
    <div className="h-[52px] block sm:hidden">
      <nav className="fixed flex bottom-0 bg-background w-full h-[52px] overflow-x-auto z-50">
        <BottomNavLinks metadata={metadata} />
      </nav>
    </div>
  );
}

export { BottomNav };
