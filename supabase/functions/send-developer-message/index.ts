// Edge function: отправляет email разработчику и авто-ответ пользователю через Resend
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DEVELOPER_EMAIL = "m90914242@gmail.com";
const FROM_EMAIL = "Digital Chinese <onboarding@resend.dev>";

interface Payload {
  name: string;
  email: string;
  message: string;
  attachments: { name: string; url: string }[];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail(apiKey: string, body: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  return text;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = (await req.json()) as Payload;
    const { name, email, message, attachments } = payload;

    // Валидация
    if (
      !name || !email || !message ||
      typeof name !== "string" || typeof email !== "string" ||
      typeof message !== "string" ||
      name.length > 200 || email.length > 320 || message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const safeAttachments = Array.isArray(attachments)
      ? attachments.slice(0, 5).filter((a) =>
        a && typeof a.name === "string" && typeof a.url === "string"
      )
      : [];

    const attachmentsHtml = safeAttachments.length > 0
      ? `<h3>Вложения:</h3><ul>${
        safeAttachments
          .map((a) =>
            `<li><a href="${escapeHtml(a.url)}">${escapeHtml(a.name)}</a></li>`
          )
          .join("")
      }</ul>`
      : "<p><em>Без вложений</em></p>";

    // Письмо разработчику
    await sendEmail(apiKey, {
      from: FROM_EMAIL,
      to: [DEVELOPER_EMAIL],
      reply_to: email,
      subject: `Новое сообщение от ${name} — Digital Chinese`,
      html: `
        <h2>Новое сообщение через сайт Digital Chinese</h2>
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <h3>Сообщение:</h3>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        ${attachmentsHtml}
      `,
    });

    // Авто-ответ пользователю
    await sendEmail(apiKey, {
      from: FROM_EMAIL,
      to: [email],
      subject: "Мы получили ваше сообщение — Digital Chinese",
      html: `
        <h2>Спасибо, ${escapeHtml(name)}!</h2>
        <p>Мы получили ваше сообщение и ответим вам в ближайшее время.</p>
        <h3>Ваше сообщение:</h3>
        <p style="white-space: pre-wrap; color: #555;">${escapeHtml(message)}</p>
        <p style="color: #888; font-size: 12px;">— Команда Digital Chinese</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-developer-message error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});