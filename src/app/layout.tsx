import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mundial26 — FIFA World Cup 2026 Group Stage Schedule",
  description:
    "Every match of the FIFA World Cup 2026 group stage, in your timezone, ready for your calendar.",
  icons: {
    icon: "/26_Logo__1_.png",
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
