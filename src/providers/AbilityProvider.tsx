"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext } from "react";

const ADMIN = ["parhomenkogm@gmail.com", "cng.nv.rstrnt@gmail.com"];
const USER = [
  "cng.nv.kitchen@gmail.com",
  "cng.nv.rstrnt.mngr13@gmail.com",
  "cng.nv.rstrnt@gmail.com",
];

type AbilityContextType = {
  isAdmin: boolean;
  isUser: boolean;
  isObserver: boolean;
};

const AbilityContext = createContext<AbilityContextType | null>(null);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const isAdmin = ADMIN.includes(data?.user?.email ?? "");
  const isUser = USER.includes(data?.user?.email ?? "");
  const isObserver = !isAdmin && !isUser;

  return (
    <AbilityContext.Provider value={{ isAdmin, isUser, isObserver }}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  const ctx = useContext(AbilityContext);
  if (!ctx) throw new Error("useAbility must be used inside AbilityProvider");
  return ctx;
}
