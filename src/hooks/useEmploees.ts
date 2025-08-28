"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Employee {
  id: number;
  name: string;
  position: string;
  rate: number;
}

// универсальный fetcher
const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export function useEmployees() {
  const queryClient = useQueryClient();

  const TWELVE_HOURS_IN_MS = 1000 * 60 * 60 * 12;

  // 🔹 Получение всех сотрудников
  const employeesQuery = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: () => fetcher("/api/employees"),
    staleTime: TWELVE_HOURS_IN_MS,
    gcTime: TWELVE_HOURS_IN_MS,
  });

  // 🔹 Создание сотрудника
  const createMutation = useMutation({
    mutationFn: (newEmployee: Omit<Employee, "id">) =>
      fetcher("/api/employees", {
        method: "POST",
        body: JSON.stringify(newEmployee),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // 🔹 Удаление сотрудника
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetcher(`/api/employees/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    employeesQuery,
    createMutation,
    deleteMutation,
  };
}
