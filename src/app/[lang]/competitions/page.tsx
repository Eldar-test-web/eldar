import { redirect } from "next/navigation";
import { isLang } from "@/lib/i18n";

export default async function CompetitionsAlias({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  redirect(isLang(raw) ? `/${raw}/achievements` : "/en/achievements");
}
