"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

export function LangSetter({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = document.title; // keep Next metadata title
  }, [lang]);
  return null;
}
