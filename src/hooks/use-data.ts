// "use client";
// import { useState, useEffect } from "react";

// export function useData({ api }: { api: string }) {
//   const [data, setData] = useState<{ id: number; date: string }[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = () => {
//     setLoading(true);
//     fetch(`/api/${api}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then((json) => {
//         setData(json);
//         setError(null);
//       })
//       .catch((e) => setError(e.message))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return { data, loading, error, refetch: fetchData };
// }

"use client";

import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

interface UseApiOptions {
  endpoint: string;
  queryKey: string | string[];
  // staleTime?: number;
  // gcTime?: number;
}

export function useData<T>({ endpoint, queryKey }: UseApiOptions) {
  const api = `/api/${endpoint}`;

  const { data, isLoading, refetch } = useQuery<T[]>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetcher(api),
  });

  return {
    data: data ?? null,
    loading: isLoading,
    refetch,
  };
}
