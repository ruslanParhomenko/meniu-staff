import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    SHEET_ID: process.env.NEXT_PUBLIC_SHEET_ID,
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  reactStrictMode: true,
  /* config options here */
};

export default withNextIntl(nextConfig);
