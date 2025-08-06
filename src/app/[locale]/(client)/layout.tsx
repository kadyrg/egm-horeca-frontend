import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");

  return {
    title: t("title"),
    description: t("description"),
  };
};

export default function Layout({ children } : { children: React.ReactNode; }) {
  return (
    <>
      <TopBar />
      <Header title={"EGM HOreca"} />
      {children}
      <BottomNav />
    </>
  );
};
