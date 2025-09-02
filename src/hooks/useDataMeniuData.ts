"use client";
import { useQuery } from "@tanstack/react-query";
const API_URL_MENIU =
  "https://script.google.com/macros/s/AKfycbxtCCWo3UGXR9N1WSAqoUUJIrqCLaaozsiK8Rnngjo3nCRPN9crMx6mIKfukBIBEii-Mg/exec";

async function fetchDaily() {
  const response = await fetch(API_URL_MENIU, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  return response.json();
}

export function useMeniuData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["daily-data"],
    queryFn: fetchDaily,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error };
}
