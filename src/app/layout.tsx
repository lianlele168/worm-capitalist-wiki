import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: "Worm Capitalist Guide (August 2026)",
    template: "%s | Worm Capitalist Guide",
  },
  description: site.description,
  keywords: [
    "Worm Capitalist guide",
    "Worm Capitalist walkthrough",
    "Worm Capitalist demo",
    "Worm Capitalist upgrades",
    "Worm Capitalist profit calculator",
    "Worm Capitalist skill tree",
    "Worm Capitalist rebirth",
    "Worm Capitalist Steam demo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "Worm Capitalist Guide - Demo Walkthrough and Calculator",
    description: site.description,
    images: [{ url: "/cover.png", width: 630, height: 500, alt: "Worm Capitalist cover art" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worm Capitalist Guide - Demo Walkthrough and Calculator",
    description: site.description,
    images: ["/cover.png"],
  },
  icons: { icon: "/favicon.svg", apple: "/cover.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
