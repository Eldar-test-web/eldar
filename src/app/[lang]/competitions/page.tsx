import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { CompetitionsClient } from "@/components/CompetitionsClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Müsabiqələr" : "Competitions",
    description: lang === "az" ? "2020–2026 müsabiqə arxivi — sənəddə olduğu kimi." : "2020–2026 competition archive — exactly as documented.",
  };
}

export default async function CompetitionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const dict = getDict(raw);
  return <CompetitionsClient lang={raw} dict={dict} />;
}
