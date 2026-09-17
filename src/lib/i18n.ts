export type Lang = "en" | "az";

export const langs: Lang[] = ["en", "az"];
export const defaultLang: Lang = "en";

export function isLang(v: string | undefined): v is Lang {
  return v === "en" || v === "az";
}

export const langNames: Record<Lang, string> = {
  en: "EN",
  az: "AZ",
};
