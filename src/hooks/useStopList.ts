// hooks/useStopList.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchStopList() {
  const res = await fetch("/api/stop-list");
  if (!res.ok) throw new Error("Ошибка загрузки stop-list");
  return res.json();
}

async function saveStopList(data: any) {
  const res = await fetch("/api/stop-list", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка сохранения");
  return res.json();
}

export function useStopList() {
  const queryClient = useQueryClient();
  const TWELVE_HOURS_IN_MS = 1000 * 60 * 60 * 12;

  const stopListQuery = useQuery({
    queryKey: ["stopList"],
    queryFn: fetchStopList,
    staleTime: TWELVE_HOURS_IN_MS,
    gcTime: TWELVE_HOURS_IN_MS,
  });

  const saveMutation = useMutation({
    mutationFn: saveStopList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stopList"] });
    },
  });

  return { stopListQuery, saveMutation };
}
