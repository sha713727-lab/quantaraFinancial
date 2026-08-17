import nodemailer from "nodemailer";

import { log } from "@/lib/logger";

export async function sendTitanEmail({
  user,
  pass,
  to,
  replyTo,
  subject,
  text,
}: {
  readonly user: string;
  readonly pass: string;
  readonly to: string;
  readonly replyTo: string;
  readonly subject: string;
  readonly text: string;
}): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `Quantara Financial <${user}>`,
      to,
      replyTo,
      subject,
      text,
    });
    return true;
  } catch (error: unknown) {
    log("error", "smtp_send_failed", {
      errorName: error instanceof Error ? error.name : "unknown",
    });
    return false;
  } finally {
    transporter.close();
  }
}
