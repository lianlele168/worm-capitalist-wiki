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
 title: {default: "Worm Capitalist demo guide", template: "%s | Worm Capitalist Guide"},
 description: site.description, icons: {icon:"/favicon.svg"}, robots:{index:true,follow:true},
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
