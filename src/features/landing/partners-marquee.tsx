import Image from "next/image";

type Partner = {
  readonly name: string;
  readonly logo: string;
};

const partners: readonly Partner[] = [
  { name: "Bahri", logo: "/partners/bahri.png" },
  { name: "Location.Pro", logo: "/partners/locationPro.png" },
  { name: "in2", logo: "/partners/in2.png" },
  { name: "Hemptown USA", logo: "/partners/hemptownUsa.png" },
  { name: "exex", logo: "/partners/exex.png" },
  { name: "Artillery One", logo: "/partners/artilleryOne.png" },
  { name: "djob.ch", logo: "/partners/djobCh.png" },
  { name: "Link Fitness", logo: "/partners/linkFitness.png" },
  { name: "zillah", logo: "/partners/zillah.png" },
  { name: "monorail", logo: "/partners/monorail.png" },
  { name: "Kirkman", logo: "/partners/kirkman.png" },
  { name: "ScreenCloud", logo: "/partners/screencloud.png" },
  { name: "MACH", logo: "/partners/mach.png" },
  { name: "Spores", logo: "/partners/spores.png" },
  { name: "tranwall", logo: "/partners/tranwall.png" },
];

const marqueeItems = [...partners, ...partners];

export function PartnersMarqueeSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-title"
      className="bg-brand-navy relative overflow-hidden pb-12 sm:pb-14"
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="text-brand-cream h-10 w-full sm:h-12"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 0h1440v18C1260 52 1080 4 900 28 720 52 540 4 360 28 180 52 90 8 0 22V0Z"
        />
      </svg>

      <h2 id="partners-title" className="sr-only">
        Trusted by growing businesses across markets
      </h2>

      <div className="partners-marquee relative mt-4 sm:mt-6">
        <div className="partners-marquee-fade partners-marquee-fade-left" />
        <div className="partners-marquee-fade partners-marquee-fade-right" />

        <div className="partners-marquee-track">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex h-12 shrink-0 items-center px-7 sm:px-10"
            >
              <span className="relative block h-8 w-28">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="7rem"
                  className="partners-logo object-contain"
                  unoptimized
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
