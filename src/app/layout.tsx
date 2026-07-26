import type { Metadata } from "next";
import { Montserrat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${hanken.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: algunas extensiones del navegador inyectan
          atributos en <body> (p. ej. cz-shortcut-listen) antes de la hidratación. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
