const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

if (configured === undefined || !configured.includes("@")) {
  throw new Error("NEXT_PUBLIC_CONTACT_EMAIL is not configured.");
}

export const contactEmail = configured;

export const contactPhone = "03214433514";

export const contactPhoneDisplay = "03214433514 (WhatsApp only)";

export const contactPhoneE164 = "+923214433514";

export function phoneHref(): string {
  return `https://wa.me/${contactPhoneE164.replace("+", "")}`;
}
