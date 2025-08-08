"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  position: string;
};

type Employee = {
  id: number;
  name: string;
  position: string;
  email: string;
};

export default function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        position: data.position,
        email: `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@example.com`,
      }),
    });

    setLoading(false);
    fetchEmployees(); // обновить список
  };

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Добавить сотрудника</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">Обязательное поле</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Фамилия</Label>
          <Input id="lastName" {...register("lastName", { required: true })} />
          {errors.lastName && (
            <p className="text-red-500 text-sm">Обязательное поле</p>
          )}
        </div>

        <div>
          <Label htmlFor="position">Должность</Label>
          <Input id="position" {...register("position", { required: true })} />
          {errors.position && (
            <p className="text-red-500 text-sm">Обязательное поле</p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Сохраняем..." : "Сохранить"}
        </Button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mt-6">Сотрудники:</h2>
        <ul className="mt-2 space-y-1">
          {employees.map((emp) => (
            <li key={emp.id}>
              {emp.name} – {emp.position}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
