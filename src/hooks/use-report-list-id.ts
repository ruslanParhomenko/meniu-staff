import { useState, useEffect } from "react";
import { ref } from "yup";

interface CashVerify {
  id: number;
  hours: string;
  value: string;
  reportId: number;
}

interface Tobacco {
  id: number;
  name: string;
  stock: number;
  incoming: number | null;
  outgoing: number | null;
  finalStock: string;
  reportId: number;
}

interface Expense {
  id: number;
  name: string;
  sum: number | string;
  reportId: number;
}

interface Report {
  id: number;
  date: string;
  total: number;
  cashVerify: CashVerify[];
  tobacco: Tobacco[];
  expenses: Expense[];
}

export const useReportListById = (id: number) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchReport = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/report/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch report");
        }
        const data: Report = await res.json();
        setReport(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  return { report, loading, error };
};
