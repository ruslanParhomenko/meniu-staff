"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const ADMIN = [
  "parhomenkogm@gmail.com",
  "cng.nv.rstrnt.mngr@gmail.com",
  "lavandavazat5@gmail.com",
];
export const BAR = ["cng.nv.rstrnt@gmail.com"];
export const CUCINA = ["cng.nv.kitchen@gmail.com"];
export const USER = ["cng.srvlnc@gmail.com"];
type AbilityContextType = {
  isAdmin: boolean;
  isBar: boolean;
  isCucina: boolean;
  isObserver: boolean;
  isUser: boolean;
};

const AbilityContext = createContext<AbilityContextType | null>(null);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const [ability, setAbility] = useState<AbilityContextType>({
    isAdmin: false,
    isBar: false,
    isCucina: false,
    isObserver: true,
    isUser: false,
  });

  useEffect(() => {
    if (data?.user?.email) {
      const isAdmin = ADMIN.includes(data.user.email);
      const isCucina = CUCINA.includes(data.user.email);
      const isBar = BAR.includes(data.user.email);
      const isUser = USER.includes(data.user.email);
      const isObserver = !isAdmin && !isCucina && !isBar;

      setAbility({ isAdmin, isCucina, isBar, isObserver, isUser });
    } else {
      setAbility({
        isAdmin: false,
        isCucina: false,
        isBar: false,
        isObserver: true,
        isUser: false,
      });
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
