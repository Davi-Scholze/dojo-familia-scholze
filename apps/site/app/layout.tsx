import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ORG_NAME, SLOGAN, FILOSOFIA_CITACAO } from "@dojo-fs/ui";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const APP_NAME = ORG_NAME;
const APP_DESCRIPTION = `${ORG_NAME}: Judô e Jiu-Jitsu em Curitiba. ${FILOSOFIA_CITACAO.texto} — ${FILOSOFIA_CITACAO.autor}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} — ${SLOGAN}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
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
    siteName: APP_NAME,
    title: `${APP_NAME} — ${SLOGAN}`,
    description: `Judô e Jiu-Jitsu em Curitiba — ${SLOGAN}.`,
    images: [
      {
        url: "/og-image.png",
        width: 1280,
        height: 720,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — ${SLOGAN}`,
    description: `Judô e Jiu-Jitsu em Curitiba — ${SLOGAN}.`,
  },
  icons: {
    icon: "/logo-redondo-branco.png",
    apple: "/pwa-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dojô FS",
  },
  formatDetection: {
    telephone: false,
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
  viewportFit: "cover",
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
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ("serviceWorker" in navigator && window.location.protocol === "https:") {
              navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((err) => {
                console.warn("[SW] registration failed:", err);
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
