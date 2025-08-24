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

export function useDataById({ id, api }: { id: number | null; api: string }) {
  const [data, setData] = useState<BreakList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    if (!id) return setData(null);

    setLoading(true);
    fetch(`/api/${api}/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            setData(null);
            setError(null);
            return;
          }
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { data, loading, error, refetch: fetchData };
}
