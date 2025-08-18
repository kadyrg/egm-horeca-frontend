import { Header } from "@/components/client/layout/header";
import { TopBar } from "@/components/client/layout/top-bar";
import { Footer } from "@/components/client/layout/footer";
import { BottomNav } from "@/components/client/layout/bottom-nav";
import { getRootLayoutMetadata } from "@/lib/api/metadata";
import { StateInitializers } from "@/components/client/shared/state-initializers";
import StoreProvider from "@/store/store-provider";

export default async function Layout({
  children
} : {
  children: React.ReactNode
}) {
  const metadata = await getRootLayoutMetadata();

  return (
    <StoreProvider>
      <StateInitializers />
      <TopBar metadata={metadata.topBar} />
      <Header metadata={metadata.header} />
      {children}
      <Footer />
      <BottomNav metadata={metadata.bottomNav} />
    </StoreProvider>
  );
};
