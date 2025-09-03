"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeniuData } from "@/app/actions/getMeniuData";

export function useMeniuData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["daily-data"],
    queryFn: () => getMeniuData(),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error };
}
