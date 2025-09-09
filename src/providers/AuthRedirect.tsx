"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      // 1. Проверяем mainMode
      const res = await fetch("/api/mode");
      const { mainMode } = await res.json();

      if (!mainMode) {
        router.replace("/loading");
        return;
      }

      // 2. Проверяем авторизацию
      if (session?.user) {
        router.replace("/meniu-staff");
        return;
      }

      setIsChecking(false);
    }

    if (session !== undefined) checkAccess();
  }, [session, router]);

  if (isChecking) return <p>Загрузка...</p>;

  return <>{children}</>;
};

export default AuthRedirect;
