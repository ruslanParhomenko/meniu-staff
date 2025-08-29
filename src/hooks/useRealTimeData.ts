"use client";
import { useSession } from "next-auth/react";

export const useBreakListSupabase = ({
  localStorageKey,
  apiKey,
  user,
}: {
  localStorageKey: string;
  apiKey: string;
  user: "bar" | "cucina";
}) => {
  const fetchMail = {
    bar: "cng.nv.rstrnt@gmail.com",
    cucina: "cng.nv.kitchen@gmail.com",
  };
  const session = useSession();
  const sendRealTime = async () => {
    const localData = localStorage.getItem(localStorageKey);
    if (!localData) return;
    try {
      const res = await fetch(`/api/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: session?.data?.user?.email,
          form_data: JSON.parse(localData),
        }),
      });

      const result = await res.json();
      if (result.error) console.error("Sync error:", result.error);
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  const fetchRealTime = async () => {
    try {
      const res = await fetch(`/api/${apiKey}`);
      const allData = await res.json();

      const userData = allData.find(
        (item: any) => item.user_email === fetchMail[user]
      );

      if (userData?.form_data) {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(userData.form_data)
        );
        return userData.form_data;
      }
      return null;
    } catch (err) {
      console.error("Error fetching Supabase data:", err);
      return null;
    }
  };

  return { sendRealTime, fetchRealTime };
};
