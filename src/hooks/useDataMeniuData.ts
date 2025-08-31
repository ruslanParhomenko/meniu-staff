"use client";
import { useQuery } from "@tanstack/react-query";
const API_URL_MENIU =
  "https://script.google.com/macros/s/AKfycbwqxcEmovwsYhWQ5-hTsNuubAiAWgAedzyJNVFfb_C0lhdglvXjPuiXF8FcD0KyFmthRw/exec";

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
