import { useState, useEffect } from "react";

export function useDataById<T>({
  id,
  api,
}: {
  id: number | null;
  api: string;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!id) return setData(null);

    setLoading(true);
    fetch(`/api/${api}/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            setData(null);

            return;
          }
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((e) => {
        setData(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { data, loading, refetch: fetchData };
}
