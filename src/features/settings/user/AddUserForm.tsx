"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function AddUserForm() {
  const { isAdmin } = useAbility();
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");

  const form = useForm<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: any) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));

    // await fetch("/api/employees", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: `${data.firstName} ${data.lastName}`,
    //     position: data.position,
    //     rate: data.rate,
    //   }),
    // });
    form.reset();
  };
  return (
    <div className="w-full px-2 md:w-1/2 ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className="my-2">
            <Label className="mb-2" htmlFor="firstName">
              {t("mail")}
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
              {t("role")}
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
            {tUI("save")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
