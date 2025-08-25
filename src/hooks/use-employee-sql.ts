"use client";

import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useEmployeeSqlData() {
  const { isAdmin } = useAbility();

  const t = useTranslations("Settings");

  const [employees, setEmployees] = useState<
    {
      id: number;
      name: string;
      position: string;
      createdAt: string;
      rate: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteEmployee = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));

    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    await fetchEmployees();
  };

  const fetchEmployees = () =>
    fetch("/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, refetch: fetchEmployees, deleteEmployee };
}
