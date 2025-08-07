"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { data: session } = useSession();

  console.log("Session data:", session);

  useEffect(() => {
    if (session === undefined) return;

    if (session?.user) {
      router.replace("/report");
    } else {
      setIsCheckingAuth(false);
    }
  }, [session, router]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthRedirect;
