declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      e: "event",
      action: string,
      variant_name: Record<string, string>,
    ) => void;
  }
}

type Payload = { type: string; price: string };

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbyZy9ZCR-hmb2-GmKcYp4asIGk3MOTmUeC0o5HzLpDjCwgzKXtix2envxMdadJWLtE9/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          date,
          variant: "ghk_5247_2",
          form_name: "forms1",
          ...payload,
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
