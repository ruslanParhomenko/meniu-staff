"use client";

import { Employee } from "@/generated/prisma";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { useApi } from "@/hooks/use-query";
import { createContext, useContext, useEffect } from "react";

interface EmployeesContextValue {
  employees: Employee[];
  isLoading: boolean;
  isError: boolean;
  delete: (id: number) => void;
  create: (data: Omit<Employee, "id" | "createdAt">) => void;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(
  undefined
);

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const { query, deleteMutation, createMutation } = useApi<Employee>({
    endpoint: "employees",
    queryKey: "employees",
  });

  const { getValue, setValue } = useLocalStorageForm<Employee[]>("employees");

  const employees = query.data || getValue() || [];

  useEffect(() => {
    if (query.data) {
      setValue(query.data);
    }
  }, [query.data, setValue]);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        isLoading: query.isLoading,
        isError: query.isError,
        delete: deleteMutation.mutate,
        create: createMutation.mutate,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx)
    throw new Error("useEmployees must be used within EmployeesProvider");
  return ctx;
}
