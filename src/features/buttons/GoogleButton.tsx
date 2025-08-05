"use client";
import { useRouter } from "@/i18n/navigation";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/report";
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <button
        className="bg-white text-black px-4 py-2 rounded shadow hover:bg-blue-300 transition-colors cursor-pointer  font-bold min-w-3xs"
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl,
          });
        }}
      >
        Sign in with Google
      </button>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-blue-300 transition-colors cursor-pointer  font-bold min-w-3xs"
        onClick={() => {
          router.replace("/report");
        }}
      >
        without Google
      </button>
    </div>
  );
};

export default GoogleButton;
