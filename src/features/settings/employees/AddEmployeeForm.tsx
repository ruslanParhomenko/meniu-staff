"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { defaultEmployee, EmployeeFormData, schemaEmployee } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEmployees } from "@/providers/EmployeeProvider";
import TextInput from "@/components/inputs/TextInput";

export function AddEmployeeForm() {
  // const { create: createMutation } = useEmployees();
  const { isAdmin } = useAbility();
  const t = useTranslations("Home");

  const form = useForm<EmployeeFormData>({
    resolver: yupResolver(schemaEmployee),
    defaultValues: defaultEmployee,
  });

  const { handleSubmit, reset } = form;

  // const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
  //   if (!isAdmin) return toast.error(t("insufficientRights"));

  //   try {
  //     createMutation({
  //       name: `${data.firstName} ${data.lastName}`,
  //       position: data.position,
  //       rate: data.rate,
  //     });
  //     toast.success(t("createdSuccessfully"));
  //     reset();
  //   } catch {
  //     toast.error("errorOccurred");
  //   }
  // };

  return (
    <div className="w-full px-2 md:w-1/2 ">
      <Form {...form}>
        <form onSubmit={handleSubmit(() => {})} className="space-y-4 ">
          <div className="my-2">
            <Label className="mb-2" htmlFor="firstName">
              {t("firstName")}
            </Label>
            <TextInput fieldName="firstName" fieldLabel="" />
          </div>

          <div className="my-2">
            <Label className="mb-2" htmlFor="lastName">
              {t("lastName")}
            </Label>
            <TextInput fieldName="lastName" fieldLabel="" />
          </div>

          <div className="my-2">
            <Label className="mb-2" htmlFor="position">
              {t("position")}
            </Label>
            <TextInput fieldName="position" fieldLabel="" />
          </div>
          <div className="my-2">
            <Label className="mb-2" htmlFor="rate">
              {t("rate")}
            </Label>
            <TextInput fieldName="rate" fieldLabel="" />
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {t("save")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
