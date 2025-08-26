"use client";
import SelectField from "@/components/inputs/SelectField";
import TextInput from "@/components/inputs/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
  const { handleSubmit } = form;

  const onSubmit = async (data: any) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));

    console.log(data);

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
            <Label className="mb-2" htmlFor="mail">
              {t("mail")}
            </Label>
            <TextInput fieldName="mail" fieldLabel="" />
          </div>

          <div className="my-2">
            <Label className="mb-2" htmlFor="role">
              {t("role")}
            </Label>
            <SelectField
              fieldName="role"
              data={["admin", "user", "observer", "guest", "bar", "cucina"]}
            />
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {tUI("save")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
