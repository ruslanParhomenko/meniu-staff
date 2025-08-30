"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzRbakMVlKXM_oDNnCLlY7gHhNPnEdNh6RaeI4U7fw7Z1vFiaHR9_w1MhbjBC8TPjjH/exec";

export type Employee = {
  rate: number;
  date: string;
  name: string;
  position: string;
  totalVacation: number;
  vacation: number;
};

export type User = {
  id: number;
  mail: string;
  role: string;
  isActive: boolean;
};

type DataGoogle = {
  employees: Employee[];
  users: User[];
};

type UseGoogleEmployeesOptions = {
  endpoint?: string;
  enabled?: boolean;
};

async function fetchGoogleEmployees(endpoint: string): Promise<DataGoogle> {
  const res = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await res.json();

  const employees: Employee[] = data.employees ?? [];
  const users: User[] = data.user ?? [];

  return { employees, users };
}

export function useGoogleEmployees({
  endpoint = GOOGLE_SHEET_URL as string,
  enabled = true,
}: UseGoogleEmployeesOptions = {}) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["googleEmployees", endpoint],
    queryFn: () => fetchGoogleEmployees(endpoint),
    enabled,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["googleEmployees", endpoint] });

  return {
    ...query,
    invalidate,
  };
}
