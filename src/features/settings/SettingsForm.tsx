"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Delete } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

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
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");
  const session = useSession();
  const isAdmin =
    session.data?.user?.email === "parhomenkogm@gmail.com" ||
    session.data?.user?.email === "cng.nv.rstrnt.mngr@gmail.com";
  const form = useForm<FormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const onSubmit = async (data: FormData) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    setLoading(true);

    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        position: data.position,
      }),
    });

    setLoading(false);
    fetchEmployees();
    form.reset();
  };

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  };
  const deleteEmployee = async (id: number) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    await fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col  w-full justify-between md:flex-row  p-10">
      <div className="w-full md:w-1/4">
        <h1 className="text-2xl font-bold">{t("addEmployee")}</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="my-2">
              <Label className="mb-2" htmlFor="firstName">
                {t("firstName")}
              </Label>
              <Input
                id="firstName"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{t("requiredField")}</p>
              )}
            </div>

            <div className="my-2">
              <Label className="mb-2" htmlFor="lastName">
                {t("lastName")}
              </Label>
              <Input
                id="lastName"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{t("requiredField")}</p>
              )}
            </div>

            <div className="my-2">
              <Label className="mb-2" htmlFor="position">
                {t("position")}
              </Label>
              <Input
                id="position"
                {...register("position", { required: true })}
              />
              {errors.position && (
                <p className="text-red-500 text-sm">{t("requiredField")}</p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "......" : tUI("save")}
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-full md:w-1/4">
        <h2 className="text-lg font-semibold mt-6">{t("employees")}:</h2>
        {employees.map((emp) => (
          <div key={emp.id} className="flex justify-between py-2">
            <Label className="min-w-1/3">{emp.name}</Label>
            <Label className="text-muted-foreground ">{emp.position}</Label>
            <Button type="button" onClick={() => deleteEmployee(emp.id)}>
              <Delete />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
