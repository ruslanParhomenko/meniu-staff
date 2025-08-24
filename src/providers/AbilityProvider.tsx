"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const ADMIN = [
  "parhomenkogm@gmail.com",
  "cng.nv.rstrnt.mngr@gmail.com",
  "lavandavazat5@gmail.com",
];
const USER = ["cng.nv.kitchen@gmail.com", "cng.nv.rstrnt@gmail.com"];

type AbilityContextType = {
  isAdmin: boolean;
  isUser: boolean;
  isObserver: boolean;
};

const AbilityContext = createContext<AbilityContextType | null>(null);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const [ability, setAbility] = useState<AbilityContextType>({
    isAdmin: false,
    isUser: false,
    isObserver: true,
  });

  useEffect(() => {
    if (data?.user?.email) {
      const isAdmin = ADMIN.includes(data.user.email);
      const isUser = USER.includes(data.user.email);
      const isObserver = !isAdmin && !isUser;

      setAbility({ isAdmin, isUser, isObserver });
    } else {
      setAbility({ isAdmin: false, isUser: false, isObserver: true });
    }
  }, [data?.user?.email]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  const ctx = useContext(AbilityContext);
  if (!ctx) throw new Error("useAbility must be used inside AbilityProvider");
  return ctx;
}
