"use client";
import { useSession } from "next-auth/react";

export const useDataSupaBase = ({
  localStorageKey,
  apiKey,
  user,
}: {
  localStorageKey: string;
  apiKey: string;
  user: "bar" | "cucina" | "all";
}) => {
  const fetchMail = {
    bar: ["cng.nv.rstrnt@gmail.com"],
    cucina: ["cng.nv.kitchen@gmail.com"],
    all: ["cng.nv.rstrnt@gmail.com", "cng.nv.kitchen@gmail.com"],
  };
  const session = useSession();
  const sendRealTime = async (formData?: any) => {
    const dataToSend = formData || localStorage.getItem(localStorageKey);
    if (!dataToSend) return;
    try {
      const res = await fetch(`/api/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: session?.data?.user?.email,
          form_data: JSON.parse(dataToSend),
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

      const userData = allData.find((item: any) =>
        fetchMail[user].includes(item.user_email)
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
      console.error("Error fetching SupaBase data:", err);
      return null;
    }
  };

  return { sendRealTime, fetchRealTime };
};
