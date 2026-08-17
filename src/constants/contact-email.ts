const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

if (configured === undefined || !configured.includes("@")) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL is not configured.");
}

export const contactEmail = configured;

export const contactPhone = "+1 (877) 963-6280";

export function phoneHref(phone: string): string {
  return `tel:${phone.replaceAll(/[^\d+]/g, "")}`;
}
