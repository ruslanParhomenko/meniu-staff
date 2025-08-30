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
  isBar: boolean;
  isCucina: boolean;
  isObserver: boolean;
  isUser: boolean;
  query: User[];
  // createMutation: (data: Omit<User, "id" | "createdAt">) => void;
  // deleteMutation: (id: number) => void;
};

const AbilityContext = createContext<AbilityContextType | null>(null);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  // const { query, createMutation, deleteMutation } = useApi<User>({
  //   endpoint: "user",
  //   queryKey: "users",
  // });

  const { data: user, isLoading, invalidate } = useGoogleEmployees({});

  const [ability, setAbility] = useState({
    isAdmin: false,
    isBar: false,
    isCucina: false,
    isObserver: true,
    isUser: false,
  });

  useEffect(() => {
    const email = data?.user?.email;
    const userData = user?.users || [];

    if (!email) return;

    const isAdmin =
      email === "parhomenkogm@gmail.com" ||
      userData.some((u) => u.role === "ADMIN" && u.mail === email);
    const isBar =
      email === "cng.nv.rstrnt@gmail.com" ||
      userData.some((u) => u.role === "BAR" && u.mail === email);
    const isCucina =
      email === "cng.nv.kitchen@gmail.com" ||
      userData.some((u) => u.role === "CUCINA" && u.mail === email);
    const isUser =
      email === "cng.srvlnc@gmail.com" ||
      userData.some((u) => u.role === "USER" && u.mail === email);

    setAbility({
      isAdmin,
      isBar,
      isCucina,
      isObserver: !isAdmin && !isBar && !isCucina && !isUser,
      isUser,
    });
  }, [data?.user?.email, user?.users]);

  const value = useMemo(
    () => ({
      ...ability,
      query: user?.users || [],
      // createMutation: createMutation.mutate,
      // deleteMutation: deleteMutation.mutate,
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
