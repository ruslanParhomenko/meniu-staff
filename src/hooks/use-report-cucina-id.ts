import { useEffect, useState } from "react";

export const useReportCucinaListById = (id: number) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchReport = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/report-cucina/${id}`);
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
