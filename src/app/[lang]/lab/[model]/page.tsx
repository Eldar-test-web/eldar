import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, langs } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { LAB_MODELS } from "@/data/models";
import { LabClient } from "@/components/LabClient";

export function generateStaticParams() {
  const out: { lang: string; model: string }[] = [];
  for (const lang of langs) for (const m of LAB_MODELS) out.push({ lang, model: m.id });
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; model: string }>;
}): Promise<Metadata> {
  const { lang, model } = await params;
  if (!isLang(lang)) return {};
  const m = LAB_MODELS.find((x) => x.id === model);
  if (!m) return {};
  return { title: m.title, description: m.subtitle };
}

export default async function LabModelPage({
  params,
}: {
  params: Promise<{ lang: string; model: string }>;
}) {
  const { lang: raw, model } = await params;
  if (!isLang(raw)) notFound();
  if (!LAB_MODELS.some((m) => m.id === model)) notFound();
  const dict = getDict(raw);
  return (
    <>
      <div className="wrap" style={{ paddingTop: 18 }}>
        <Link className="link-quiet" href={`/${raw}/lab`}>
          ← {dict.labPage.back}
        </Link>
      </div>
      <LabClient lang={raw} dict={dict} initial={model} />
    </>
  );
}
