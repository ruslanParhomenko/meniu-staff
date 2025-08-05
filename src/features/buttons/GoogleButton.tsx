"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/report";
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-white text-black px-4 py-2 rounded shadow hover:bg-blue-300 transition-colors cursor-pointer  font-bold"
        onClick={() => {
          signIn("google", {
            callbackUrl: callbackUrl,
          });
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleButton;
