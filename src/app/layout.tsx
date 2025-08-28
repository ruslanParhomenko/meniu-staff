import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { SessionProviders } from "@/providers/SessionProviders";
import { Toaster } from "react-hot-toast";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { AbilityProvider } from "@/providers/AbilityProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { EmployeesProvider } from "@/providers/EmployeeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SessionProviders>
          <NextIntlClientProvider>
            <AbilityProvider>
              <ReactQueryProvider>
                <EmployeesProvider>{children}</EmployeesProvider>
              </ReactQueryProvider>
            </AbilityProvider>
          </NextIntlClientProvider>
        </SessionProviders>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
