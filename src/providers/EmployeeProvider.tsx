"use client";

import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { Employee, useGoogleEmployees } from "@/hooks/useGoogleEmploeey";
import { createContext, use, useContext, useEffect } from "react";

interface EmployeesContextValue {
  employees: Employee[];
  isLoading: boolean;
  // isError: boolean;
  // delete: (id: number) => void;
  // create: (data: Omit<Employee, "id" | "createdAt">) => void;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(
  undefined
);

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  // const { query, deleteMutation, createMutation } = useApi<Employee>({
  //   endpoint: "employees",
  //   queryKey: "employees",
  // });

  const { data, isLoading, invalidate } = useGoogleEmployees({});
  const { getValue, setValue } = useLocalStorageForm<Employee[]>("employees");

  useEffect(() => {
    if (data?.employees) {
      setValue(data.employees);
    }
  }, [data?.employees, setValue]);

  useEffect(() => {
    if (data?.employees) {
      setValue(data.employees);
    }
  }, [data?.employees, setValue]);

  return (
    <EmployeesContext.Provider
      value={{
        employees: data?.employees || getValue() || [],
        isLoading: isLoading,
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
