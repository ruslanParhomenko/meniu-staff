"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/hooks/use-query";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { defaultEmployee, Employee, schemaEmployee } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
type CreateEmployeeFormProps = {
  name: string;
  position: string;
  rate: string;
};
export function AddEmployeeForm() {
  const { createMutation } = useApi<CreateEmployeeFormProps>({
    endpoint: "employees",
    queryKey: "employees",
  });

  const { isAdmin } = useAbility();
  const t = useTranslations("Home");

  const form = useForm<Employee>({
    resolver: yupResolver(schemaEmployee),
    defaultValues: defaultEmployee,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: any) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));

    console.log(data);

    try {
      await createMutation.mutateAsync({
        name: `${data.firstName} ${data.lastName}`,
        position: data.position,
        rate: data.rate,
      });
      toast.success(t("createdSuccessfully"));
      reset();
    } catch (error) {
      toast.error("errorOccurred");
    }
  };
  return (
    <div className="w-full px-2 md:w-1/2 ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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
          <div className="my-2">
            <Label className="mb-2" htmlFor="rate">
              {t("rate")}
            </Label>
            <Input id="rate" {...register("rate", { required: false })} />
            {errors.rate && (
              <p className="text-red-500 text-sm">{t("requiredField")}</p>
            )}
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t("save")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
