import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { assetUrl } from "@/lib/asset";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eldar-test-web.github.io/eldar"),
  title: {
    default: "Eldar Həmidov | Robotics • AI • Engineering",
    template: "%s — Eldar Həmidov",
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
    siteName: "Eldar Həmidov — Archive",
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
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FAF8F3" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111110" />
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
