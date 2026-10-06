import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, langs, type Lang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LangSetter } from "@/components/LangSetter";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const canonical = `/${lang}`;
  return {
    alternates: {
      canonical,
      languages: { en: "/en", az: "/az" },
    },
    openGraph: { locale: lang === "az" ? "az_AZ" : "en_US" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const dict = getDict(lang);

  return (
    <>
      <LangSetter lang={lang} />
      <a className="skip" href="#main">
        {dict.skip}
      </a>
      <Navbar lang={lang} dict={dict} />
      <main id="main">{children}</main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
