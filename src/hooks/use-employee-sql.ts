"use client";

import { useEffect, useState } from "react";

export function useEmployeeSqlData() {
  const [employees, setEmployees] = useState<
    { id: number; name: string; position: string; createdAt: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { employees, loading, error };
}
