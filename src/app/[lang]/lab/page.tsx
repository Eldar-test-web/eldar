import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { LabClient } from "@/components/LabClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "3D Dizayn Laboratoriyası" : "3D Design Lab",
    description:
      lang === "az"
        ? "İnteraktiv mühəndislik modelləri — gövdə, 1903 mühərriki, Aqua Fly."
        : "Interactive engineering models — hull, 1903 engine, Aqua Fly.",
  };
}

export default async function LabPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const dict = getDict(raw);
  return <LabClient lang={raw} dict={dict} />;
}
