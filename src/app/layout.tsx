import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { SessionProviders } from "@/providers/SessionProviders";
import { Toaster } from "react-hot-toast";
import { AbilityProvider } from "@/providers/AbilityProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bar App",
  description: "Report schedule and orders",
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
        className={`${fraunces.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SessionProviders>
          <NextIntlClientProvider>
            <ReactQueryProvider>
              <AbilityProvider>
                <div className="antialiased relative mx-auto h-[100vh] max-w-[500px]">
                  {children}
                </div>
              </AbilityProvider>
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </SessionProviders>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
