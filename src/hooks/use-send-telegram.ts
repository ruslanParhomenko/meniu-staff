import { toast } from "react-hot-toast";

export const useSendTelegram = () => {
  const sendTelegramMessage = async (
    data: Record<string, any>,
    url: string,
    nameOrder: string
  ) => {
    const message = `${nameOrder}:\n\n${data.notes}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast.success("Сообщение успешно отправлено!");
    } catch (e) {
      toast.error("Ошибка при отправке сообщения");
    }
  };

  return { sendTelegramMessage };
};
