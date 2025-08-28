"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUsers() {
  const queryClient = useQueryClient();

  // Получить список пользователей
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  // Создать пользователя
  const createUser = useMutation({
    mutationFn: async (data: { mail: string; role: string }) => {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Удалить пользователя
  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { usersQuery, createUser, deleteUser };
}
