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

  const stopListQuery = useQuery({
    queryKey: ["stopList"],
    queryFn: fetchStopList,
  });

  const saveMutation = useMutation({
    mutationFn: saveStopList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stopList"] });
    },
  });

  return { stopListQuery, saveMutation };
}
