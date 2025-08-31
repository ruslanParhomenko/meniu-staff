"use client";
import FrameBotton from "@/components/meniu/FrameBottom";
import FrameTop from "@/components/meniu/FrameTop";
import Header from "@/components/meniu/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased  min-h-screen md:max-w-[480px] w-full relative mx-auto px-2 pb-4">
      <Header />
      <FrameTop />
      {children}
      <FrameBotton />
    </div>
  );
}
