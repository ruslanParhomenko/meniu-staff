"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { data: session } = useSession();

<<<<<<< HEAD
  console.log("session", session);

  useEffect(() => {
    if (session?.user) {
      router.replace("/report");
    }

    setIsCheckingAuth(false);
=======
  console.log("Session data:", session);

  useEffect(() => {
    if (session === undefined) return;

    if (session?.user) {
      router.replace("/report");
    } else {
      setIsCheckingAuth(false);
    }
>>>>>>> c4fdd807280adf7e151205ca087ba6f9f6876486
  }, [session, router]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthRedirect;
