import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { ContactClient } from "@/components/ContactClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Əlaqə" : "Contact",
    description: lang === "az" ? "Akademik və əməkdaşlıq müraciətləri — e-poçt." : "Academic and collaboration inquiries — email.",
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const dict = getDict(raw);
  return <ContactClient lang={raw} dict={dict} />;
}
