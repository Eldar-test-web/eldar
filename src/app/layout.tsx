import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { assetUrl } from "@/lib/asset";

// Serif display per brief §9 (editorial engineering); Manrope body; JetBrains Mono.
// Cormorant Garamond is used because the brief explicitly names a refined
// editorial serif direction — not as a generic default.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eldar-test-web.github.io/eldar"),
  title: {
    default: "Eldar Hamidov — Signal Lab | Robotics • AI • Cybersecurity",
    template: "%s — Eldar Hamidov · Signal Lab",
  },
  description:
    "Personal engineering portfolio of Eldar Həmidov featuring robotics, AI, cybersecurity, mechanical design, competitions, projects, and interactive 3D engineering work.",
  alternates: {
    languages: { en: "/en", az: "/az" },
  },
  openGraph: {
    type: "website",
    title: "Eldar Həmidov | Robotics • AI • Engineering • Cybersecurity",
    description:
      "Robotics, AI, engineering and cybersecurity — documented competitions, projects and practice. Sumgait, Azerbaijan.",
    siteName: "Eldar Hamidov — Signal Lab",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const themeInit = `(function(){try{var k='eh-theme';var s=localStorage.getItem(k);var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="icon" type="image/svg+xml" href={assetUrl("/favicon.svg")} />
        <link rel="manifest" href={assetUrl("/manifest.webmanifest")} />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F1E9" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#131311" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Eldar Həmidov",
              nationality: "Azerbaijani",
              homeLocation: "Sumgait, Azerbaijan",
              knowsAbout: ["Robotics", "Artificial Intelligence", "Programming", "Cybersecurity", "Engineering"],
              email: "mailto:eldarhamidov2009@gmail.com",
              sameAs: [
                "https://www.youtube.com/@EldarBuildLab",
                "https://www.instagram.com/eldar_hamidov09/",
                "https://github.com/Eldar-005/eldar_hasc2025",
              ],
            }),
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
