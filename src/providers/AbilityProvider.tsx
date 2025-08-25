"use client";

import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const ADMIN = [
  "parhomenkogm@gmail.com",
  "cng.nv.rstrnt.mngr@gmail.com",
  "lavandavazat5@gmail.com",
];
const BAR = ["cng.nv.rstrnt@gmail.com"];
const CUCINA = ["cng.nv.kitchen@gmail.com"];
type AbilityContextType = {
  isAdmin: boolean;
  isBar: boolean;
  isCucina: boolean;
  isObserver: boolean;
};

const AbilityContext = createContext<AbilityContextType | null>(null);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  const [ability, setAbility] = useState<AbilityContextType>({
    isAdmin: false,
    isBar: false,
    isCucina: false,
    isObserver: true,
  });

  useEffect(() => {
    if (data?.user?.email) {
      const isAdmin = ADMIN.includes(data.user.email);
      const isCucina = CUCINA.includes(data.user.email);
      const isBar = BAR.includes(data.user.email);
      const isObserver = !isAdmin && !isCucina && !isBar;

      setAbility({ isAdmin, isCucina, isBar, isObserver });
    } else {
      setAbility({
        isAdmin: false,
        isCucina: false,
        isBar: false,
        isObserver: true,
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
