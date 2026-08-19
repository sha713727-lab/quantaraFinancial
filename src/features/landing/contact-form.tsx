"use client";

import { useActionState, useEffect, useRef } from "react";

import { services } from "@/features/landing/content";
import { submitContactEnquiry } from "@/features/landing/submit-contact-enquiry";
import type { ContactActionState } from "@/types/contact-enquiry";

const inputClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-brand-navy/15 bg-brand-cream-soft px-4 text-sm text-brand-navy outline-none transition-colors placeholder:text-brand-navy/55 focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4 focus-visible:ring-offset-brand-white";

const labelClassName =
  "block text-[0.65rem] font-bold tracking-[0.18em] text-brand-navy uppercase";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactEnquiry,
    null as ContactActionState | null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      dialogRef.current?.showModal();
      formRef.current?.reset();
    }
  }, [state]);

  const fields = state && !state.ok ? state.error.fields : undefined;
  const formError = state && !state.ok ? state.error.message : undefined;

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="relative mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
        noValidate
      >
        <p className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </p>

        <p>
          <label htmlFor="contact-first-name" className={labelClassName}>
            First Name
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={80}
            required
            aria-invalid={Boolean(fields?.firstName)}
            aria-describedby={
              fields?.firstName ? "contact-first-name-error" : undefined
            }
            className={inputClassName}
          />
          {fields?.firstName ? (
            <span
              id="contact-first-name-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.firstName}
            </span>
          ) : null}
        </p>

        <p>
          <label htmlFor="contact-last-name" className={labelClassName}>
            Last Name
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={80}
            required
            aria-invalid={Boolean(fields?.lastName)}
            aria-describedby={
              fields?.lastName ? "contact-last-name-error" : undefined
            }
            className={inputClassName}
          />
          {fields?.lastName ? (
            <span
              id="contact-last-name-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.lastName}
            </span>
          ) : null}
        </p>

        <p>
          <label htmlFor="contact-email" className={labelClassName}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(fields?.email)}
            aria-describedby={fields?.email ? "contact-email-error" : undefined}
            className={inputClassName}
          />
          {fields?.email ? (
            <span
              id="contact-email-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.email}
            </span>
          ) : null}
        </p>

        <p>
          <label htmlFor="contact-phone" className={labelClassName}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={24}
            required
            aria-invalid={Boolean(fields?.phone)}
            aria-describedby={fields?.phone ? "contact-phone-error" : undefined}
            className={inputClassName}
          />
          {fields?.phone ? (
            <span
              id="contact-phone-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.phone}
            </span>
          ) : null}
        </p>

        <p>
          <label htmlFor="contact-company" className={labelClassName}>
            Organisation
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            aria-invalid={Boolean(fields?.company)}
            aria-describedby={
              fields?.company ? "contact-company-error" : undefined
            }
            className={inputClassName}
          />
          {fields?.company ? (
            <span
              id="contact-company-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.company}
            </span>
          ) : null}
        </p>

        <p>
          <label htmlFor="contact-service" className={labelClassName}>
            Practice area
          </label>
          <select
            id="contact-service"
            name="service"
            defaultValue=""
            aria-invalid={Boolean(fields?.service)}
            aria-describedby={
              fields?.service ? "contact-service-error" : undefined
            }
            className={inputClassName}
          >
            <option value="">Tell us in the message</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
          {fields?.service ? (
            <span
              id="contact-service-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.service}
            </span>
          ) : null}
        </p>

        <p className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClassName}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            maxLength={4000}
            required
            aria-invalid={Boolean(fields?.message)}
            aria-describedby={
              fields?.message ? "contact-message-error" : undefined
            }
            className={`${inputClassName} py-3`}
          />
          {fields?.message ? (
            <span
              id="contact-message-error"
              className="text-brand-navy mt-2 block text-sm"
            >
              {fields.message}
            </span>
          ) : null}
        </p>

        {formError ? (
          <p className="text-brand-navy text-sm sm:col-span-2" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(7,20,38,0.28)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none disabled:translate-y-0 disabled:opacity-60"
          >
            {pending ? "Sending" : "Send"}
          </button>
        </div>
      </form>

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-success-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current.close();
          }
        }}
        className="border-brand-cream/12 bg-brand-navy text-brand-cream backdrop:bg-brand-deep/85 m-auto w-[min(28rem,calc(100vw-1.5rem))] rounded-[1.75rem] border p-8 backdrop:backdrop-blur-sm"
      >
        <h2
          id="contact-success-title"
          className="text-brand-cream text-xl font-bold tracking-[-0.02em] uppercase italic"
        >
          Submitted successfully
        </h2>
        <p className="text-brand-cream/85 mt-4 text-sm leading-7">
          Your message is with the Quantara team. We will reply to the email you
          entered.
        </p>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="bg-brand-cream text-brand-navy focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Close
        </button>
      </dialog>
    </>
  );
}
