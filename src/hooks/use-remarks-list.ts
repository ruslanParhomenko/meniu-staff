"use client";

import { useEffect, useState } from "react";

export interface Remark {
  id: number;
  name: string;
  dayHours: string;
  nightHours: string;
  reason: string;
  penality: string;
  reasonPenality: string;
  reportId: number;
}

export interface RemarkReport {
  id: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  remarks: Remark[];
}

export function useRemarks() {
  const [data, setData] = useState<RemarkReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/remarks");
        if (!res.ok) throw new Error("Ошибка при получении данных");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
