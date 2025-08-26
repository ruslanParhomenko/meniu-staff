"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAbility } from "@/providers/AbilityProvider";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSidebar } from "@/components/ui/sidebar";

export function SendResetButton({
  resetForm,
  fetchData,
}: {
  resetForm: () => void;
  fetchData?: () => void;
}) {
  const { isObserver } = useAbility();
  const { toggleSidebar, isMobile } = useSidebar();
  const t = useTranslations("UI");

  const [openModal, setOpenModal] = useState<"save" | "reset" | null>(null);

  const isDialogOpen = openModal !== null;

  const handleConfirm = () => {
    if (openModal === "save") {
      document.querySelector<HTMLFormElement>("form")?.requestSubmit();
    } else if (openModal === "reset") {
      resetForm();
    }
    setOpenModal(null);
  };

  return (
    <>
      <div
        className={
          "flex flex-col justify-between md:flex-row bottom-2 sticky  bg-white/80 z-10"
        }
      >
        <div className="flex justify-between md:justify-start items-center py-2 md:gap-10">
          <Button
            type="button"
            variant="default"
            className="hover:bg-blue-600"
            disabled={isObserver}
            onClick={() => setOpenModal("save")}
          >
            {t("save")}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="hover:bg-red-600"
            disabled={isObserver}
            onClick={() => setOpenModal("reset")}
          >
            {t("reset")}
          </Button>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => !open && setOpenModal(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {openModal === "save" ? t("confirmSave") : t("confirmReset")}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModal(null)}>
              {t("cancel")}
            </Button>
            <Button variant="default" onClick={handleConfirm}>
              {t("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
