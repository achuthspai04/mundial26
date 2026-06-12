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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Mundial26 — FIFA World Cup 2026 Schedule in IST, BST, CET | Add to Google Calendar",
  description:
    "View the complete FIFA World Cup 2026 match schedule in your timezone — IST, BST, CET, ET and more. Add any match to Google Calendar, download .ics or share on WhatsApp. Free, no signup. All 72 group stage matches including England, Brazil, Argentina, France, Germany, Spain and Portugal fixtures.",
  keywords:
    "FIFA World Cup 2026, World Cup schedule IST, World Cup 2026 time India, football schedule 2026, Mundial 2026, WC26 calendar, World Cup BST, World Cup CET, England World Cup time, Brazil World Cup IST, Argentina World Cup India, add World Cup to Google Calendar",
  icons: {
    icon: "/26_Logo__1_.png",
  },
  openGraph: {
    title: "Mundial26 — FIFA World Cup 2026 Schedule",
    description: "Every match. Your timezone. Your calendar.",
    url: SITE_URL,
    siteName: "Mundial26",
    images: [
      {
        url: "https://mundial26.pisharath.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mundial26 — FIFA World Cup 2026 Schedule",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mundial26 — FIFA World Cup 2026 Schedule",
    description: "Every match. Your timezone. Your calendar.",
    images: ["https://mundial26.pisharath.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
