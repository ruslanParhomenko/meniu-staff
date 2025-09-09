"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [mode, setMode] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/mode")
      .then((res) => res.json())
      .then((data) => setMode(data.mainMode));
  }, []);

  async function toggleMode() {
    const newMode = !mode;
    const res = await fetch("/api/mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: newMode }),
    });
    const data = await res.json();
    setMode(data.mainMode);
  }

  if (mode === null) return <p>Загрузка...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <p>Текущее состояние: {mode ? "✅ Включено" : "❌ Выключено"}</p>
      <button
        onClick={toggleMode}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Переключить
      </button>
    </div>
  );
}
