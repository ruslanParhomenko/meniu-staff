"use client";

import { useGoogleEmployees, User } from "@/hooks/useGoogleEmploeey";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

type AbilityContextType = {
  isAdmin: boolean;
  isObserver: boolean;
  isUser: boolean;
  query: User[];
};

const AbilityContext = createContext<AbilityContextType | null>(null);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const { data: user, isLoading, invalidate } = useGoogleEmployees({});

  console.log("user from ability", user);

  const [ability, setAbility] = useState({
    isAdmin: false,
    isObserver: true,
    isUser: false,
  });

  useEffect(() => {
    const email = data?.user?.email;
    const userData = user?.users || [];

    if (!email) return;

    const isAdmin =
      email === "cng.nv.rstrnt.mngr@gmail.com" ||
      userData.some((u) => u.role === "ADMIN" && u.mail === email);
    const isUser = !!data?.user?.email;

    setAbility({
      isAdmin,
      isObserver: !isAdmin && !isUser,
      isUser,
    });
  }, [data?.user?.email, user?.users]);

  const value = useMemo(
    () => ({
      ...ability,
      query: user?.users || [],
    }),
    [ability]
  );

  return (
    <AbilityContext.Provider value={value}>{children}</AbilityContext.Provider>
  );
}

export function useAbility() {
  const ctx = useContext(AbilityContext);
  if (!ctx) throw new Error("useAbility must be used inside AbilityProvider");
  return ctx;
}
