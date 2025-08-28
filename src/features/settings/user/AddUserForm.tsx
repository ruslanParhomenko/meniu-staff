"use client";
import SelectField from "@/components/inputs/SelectField";
import TextInput from "@/components/inputs/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { defaultUser, schemaUser, UserType } from "./scema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendResetButton } from "@/components/buttons/SendResetButton";
import { useUsers } from "@/hooks/useUser";

export function AddUserForm() {
  const { isAdmin } = useAbility();
  const tUI = useTranslations("UI");
  const t = useTranslations("Settings");
  const { usersQuery, createUser, deleteUser } = useUsers();

  const form = useForm<UserType>({
    resolver: yupResolver(schemaUser),
    defaultValues: defaultUser,
  });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    if (!isAdmin) return toast.error(t("insufficientRights"));
    await createUser.mutateAsync(data);
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
              data={["ADMIN", "USER", "OBSERVER", "GUEST", "BAR", "CUCINA"]}
            />
          </div>

          <SendResetButton resetForm={form.reset} />
        </form>
      </Form>
    </div>
  );
}
