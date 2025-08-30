"use client";
import SelectField from "@/components/inputs/SelectField";
import TextInput from "@/components/inputs/TextInput";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { defaultUser, schemaUser, UserType } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendResetButton } from "@/components/buttons/SendResetButton";

export function AddUserForm() {
  const { isAdmin } = useAbility();
  const t = useTranslations("Home");
  const form = useForm<UserType>({
    resolver: yupResolver(schemaUser),
    defaultValues: defaultUser,
  });
  const { handleSubmit } = form;

  // const onSubmit: SubmitHandler<UserType> = (data) => {
  //   if (!isAdmin) return toast.error(t("insufficientRights"));
  //   createMutation({
  //     mail: data.mail,
  //     role: data.role as Role,
  //   });
  //   form.reset();
  // };
  return (
    <div className="w-full px-2 md:w-1/2 ">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 ">
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
              data={["ADMIN", "USER", "OBSERVER", "BAR", "CUCINA"]}
            />
          </div>

          <SendResetButton resetForm={form.reset} />
        </form>
      </Form>
    </div>
  );
}
