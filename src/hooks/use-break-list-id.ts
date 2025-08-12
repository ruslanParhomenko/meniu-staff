import { useState, useEffect } from "react";

interface Hour {
  id: number;
  hour: string;
  value: string;
}

interface Row {
  id: number;
  externalId: string;
  name: string | null;
  hours: Hour[];
}

interface BreakList {
  id: number;
  date: string;
  rows: Row[];
}

export function useBreakListById(id: number | null) {
  const [data, setData] = useState<BreakList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/breakList/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}
