// /hooks/useGoogleEmployees.ts
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxru29mnCS5NwtQtMvpFY8avXXXZdfPShBir-xCgsqFSJHwmVV7ndp85tBLy8LQ1yCi/exec";

export type Employee = {
  rate: number;
  date: string;
  name: string;
  position: string;
  totalVacation: number;
  vacation: number;
};

type UseGoogleEmployeesOptions = {
  endpoint?: string; // URL Google Apps Script
  enabled?: boolean;
};

async function fetchGoogleEmployees(endpoint: string): Promise<Employee[]> {
  const res = await fetch(endpoint, {
    // no-store чтобы всегда получать фактические данные от скрипта
    cache: "no-store",
    // если нужен CORS, Apps Script должен быть опубликован корректно
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch employees: ${res.status} ${res.statusText}${
        text ? ` — ${text}` : ""
      }`
    );
  }

  // пробуем распарсить JSON
  const data = await res.json().catch(() => {
    throw new Error("Invalid JSON received from Google Apps Script");
  });

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape: expected array");
  }

  // опциональная валидация / приведение типов
  return data.map((item: any) => ({
    rate: typeof item.rate === "number" ? item.rate : Number(item.rate) || 0,
    date: item?.date ?? "",
    name: item?.name ?? "",
    position: item?.position ?? "",
    totalVacation:
      typeof item.totalVacation === "number"
        ? item.totalVacation
        : Number(item.totalVacation) || 0,
    vacation:
      typeof item.vacation === "number"
        ? item.vacation
        : Number(item.vacation) || 0,
  }));
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
    staleTime: Infinity, // считаем кэш «действительным» пока не инвалидируем вручную
    gcTime: 1000 * 60 * 60 * 24, // держим кэш 24 часа
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
