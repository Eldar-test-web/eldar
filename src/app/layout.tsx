import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { assetUrl } from "@/lib/asset";

// Self-hosted variable fonts (no Google requests at build or runtime).
// Archivo covers display + body; JetBrains Mono covers technical labels.
const display = localFont({
  src: [
    { path: "./fonts/archivo-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/archivo-latin-ext-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "./fonts/archivo-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/archivo-latin-ext-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", style: "normal" },
    {
      path: "./fonts/jetbrains-mono-latin-ext-wght-normal.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eldar-test-web.github.io/eldar"),
  title: {
    default: "Eldar Hamidov - Signal Lab | Robotics, AI, Cybersecurity",
    template: "%s - Eldar Hamidov",
  },
  description:
    "Personal engineering portfolio of Eldar Hamidov featuring robotics, AI, cybersecurity, mechanical design, competitions, projects, and interactive 3D engineering work.",
  alternates: {
    languages: { en: "/en", az: "/az" },
  },
  openGraph: {
    type: "website",
    title: "Eldar Hamidov | Robotics, AI, Engineering, Cybersecurity",
    description:
      "Robotics, AI, engineering and cybersecurity - documented competitions, projects and practice. Sumgait, Azerbaijan.",
    siteName: "Eldar Hamidov",
    images: [
      {
        url: "https://eldar-test-web.github.io/eldar/media/airo-drone-assembly.jpg",
        width: 1921,
        height: 906,
        alt: "AIRO 2026 rescue drone, CAD assembly view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldar Hamidov | Robotics, AI, Engineering, Cybersecurity",
    images: ["https://eldar-test-web.github.io/eldar/media/airo-drone-assembly.jpg"],
  },
  robots: { index: true, follow: true },
};

const themeInit = `(function(){try{var k='eh-theme';var s=localStorage.getItem(k);var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="icon" type="image/svg+xml" href={assetUrl("/favicon.svg")} />
        <link rel="manifest" href={assetUrl("/manifest.webmanifest")} />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FAFAF7" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#171512" />
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
