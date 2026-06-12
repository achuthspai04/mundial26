import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://mundial26.pisharath.dev";
const SITE_TITLE = "Mundial26 — FIFA World Cup 2026 Group Stage Schedule";
const SITE_DESCRIPTION =
  "Every match of the FIFA World Cup 2026 group stage, in your timezone, ready for your calendar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "FIFA World Cup 2026",
    "World Cup 2026 schedule",
    "World Cup 2026 fixtures",
    "World Cup match times",
    "World Cup timezone converter",
    "World Cup calendar",
    "Mundial 2026",
    "Mundial26",
  ],
  icons: {
    icon: "/26_Logo__1_.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Mundial26",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mundial26 — Every match. Your timezone. Your calendar.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "ba0107a178c98459",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <GoogleAnalytics gaId="G-HK2X2MEKY4" />
      </body>
    </html>
  );
}
