import Image from "next/image";
import { Star } from "lucide-react";

import { testimonials } from "@/features/landing/content";

const marqueeItems = [...testimonials, ...testimonials];

export function TestimonialsMarqueeSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="hero-cream relative overflow-hidden py-16 font-sans sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1360px] px-5 text-center md:px-8">
        <h2
          id="testimonials-title"
          className="text-brand-navy text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.03em] uppercase italic"
        >
          What our clients say
        </h2>
      </div>

      <div className="testimonials-marquee relative mt-10">
        <div className="testimonials-marquee-fade testimonials-marquee-fade-left" />
        <div className="testimonials-marquee-fade testimonials-marquee-fade-right" />

        <div className="testimonials-marquee-track">
          {marqueeItems.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="bg-brand-navy mx-2.5 flex w-[20rem] shrink-0 flex-col overflow-hidden rounded-2xl sm:mx-3 sm:w-[22rem]"
            >
              <header className="border-brand-cream/10 flex items-center gap-3 border-b px-5 py-4">
                <span className="bg-brand-cream/12 relative size-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.photo}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </span>
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="truncate text-xs text-white/50">{item.role}</p>
                </div>
              </header>

              <div className="flex flex-1 flex-col gap-3 px-5 py-5 text-left">
                <div
                  className="flex items-center gap-1"
                  aria-label="5 out of 5"
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="fill-brand-cream text-brand-cream size-3.5"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm leading-6 text-white/80">{item.quote}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
