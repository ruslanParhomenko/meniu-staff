import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { SessionProviders } from "@/providers/SessionProviders";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Menu Staff",
  description: "menu staff by day",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body
        className={`${fraunces.variable} antialiased h-screen`}
        suppressHydrationWarning={true}
      >
        <SessionProviders>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
