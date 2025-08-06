import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Inter } from 'next/font/google';
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");

  return {
    title: t("title"),
    description: t("description"),
  };
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ro" }]
};

export default function Layout({ children, params } : { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <TopBar />
          <Header title={"EGM HOreca"} />
          {children}
          <BottomNav />
          </NextIntlClientProvider>
      </body>
    </html>
  );
};
