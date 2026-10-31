import nodemailer from "nodemailer";

type EnquiryAlert = {
  name: string; company?: string; email: string; phone?: string;
  interest?: string; message: string; eventId?: string;
};

const cfg = {
  host: process.env.SMTP_HOST ?? "",
  port: Number(process.env.SMTP_PORT ?? 587),
  user: process.env.SMTP_USER ?? "",
  pass: process.env.SMTP_PASS ?? "",
  from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
  to: process.env.ENQUIRY_NOTIFY_TO ?? "",
};

const transport = cfg.host && cfg.user && cfg.pass && cfg.to
  ? nodemailer.createTransport({ host: cfg.host, port: cfg.port, secure: cfg.port === 465, requireTLS: cfg.port !== 465, auth: { user: cfg.user, pass: cfg.pass } })
  : null;

export function enquiryEmail(e: EnquiryAlert) {
  const lines = [
    ["Name", e.name], ["Company", e.company], ["Email", e.email], ["Phone", e.phone],
    ["Interest", e.interest], ["Event", e.eventId],
  ].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  return {
    subject: `New website enquiry: ${e.name}${e.company ? ` (${e.company})` : ""}`.replace(/[\r\n]+/g, " "),
    text: `${lines.join("\n")}\n\nMessage:\n${e.message}\n\nReply to this email to answer them directly.\nAll enquiries: https://aptivatechnologies.com/#/admin`,
  };
}

// Best effort: the enquiry is already saved, so a mail failure is only logged.
export async function sendEnquiryAlert(e: EnquiryAlert) {
  if (!transport) return;
  try {
    await transport.sendMail({ from: `Aptiva Website <${cfg.from}>`, to: cfg.to, replyTo: e.email, ...enquiryEmail(e) });
  } catch (err) {
    console.error("[enquiry-alert] send failed:", (err as Error).message);
  }
}
