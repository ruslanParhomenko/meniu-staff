import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { SessionProviders } from "@/providers/SessionProviders";
import { Toaster } from "react-hot-toast";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { AbilityProvider } from "@/providers/AbilityProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import FrameTop from "@/components/meniu/FrameTop";
import FrameBotton from "@/components/meniu/FrameBottom";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
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
        className={`${lora.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SessionProviders>
          <NextIntlClientProvider>
            <ReactQueryProvider>
              <AbilityProvider>
                <div className="antialiased relative mx-auto h-screen">
                  <FrameTop />
                  {children}
                  <FrameBotton />
                </div>
              </AbilityProvider>
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </SessionProviders>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
