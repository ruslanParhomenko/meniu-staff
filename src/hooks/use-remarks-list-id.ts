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

export function useRemarkById(id?: number) {
  const [data, setData] = useState<RemarkReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/remarks/${id}`);
        if (!res.ok) throw new Error("Ошибка при получении отчёта");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { data, loading, error };
}
