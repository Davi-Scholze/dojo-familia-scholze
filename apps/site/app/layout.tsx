import type { Metadata, Viewport } from "next";
import { ORG_NAME, SLOGAN, FILOSOFIA_CITACAO } from "@dojo-fs/ui";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG_NAME} — ${SLOGAN}`,
    template: `%s | ${ORG_NAME}`,
  },
  description: `${ORG_NAME}: Judô e Jiu-Jitsu em Curitiba. ${FILOSOFIA_CITACAO.texto} — ${FILOSOFIA_CITACAO.autor}.`,
  applicationName: ORG_NAME,
  authors: [{ name: "Sensei Cristiano Scholze" }],
  keywords: [
    "judô",
    "jiu-jitsu",
    "BJJ",
    "artes marciais",
    "Curitiba",
    "dojô",
    "Família Scholze",
    "ceder para vencer",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: ORG_NAME,
    title: `${ORG_NAME} — ${SLOGAN}`,
    description: `Judô e Jiu-Jitsu em Curitiba — ${SLOGAN}.`,
    images: [
      {
        url: "/og-image.png",
        width: 1280,
        height: 720,
        alt: ORG_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${ORG_NAME} — ${SLOGAN}`,
    description: `Judô e Jiu-Jitsu em Curitiba — ${SLOGAN}.`,
  },
  icons: {
    icon: "/logo-redondo-branco.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
