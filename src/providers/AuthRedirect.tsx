"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session === undefined) null;

    if (session?.user) {
      router.replace("/meniu-staff");
    } else {
      setIsCheckingAuth(true);
    }
  }, [session, router]);

  if (!isCheckingAuth) return null;

  return <>{children}</>;
};

export default AuthRedirect;
