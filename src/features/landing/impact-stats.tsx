import { impactStats } from "@/features/landing/content";
import { ImpactStatsMotion } from "@/features/landing/impact-stats-motion.client";
import styles from "@/features/landing/impact-stats.module.css";
import { cn } from "@/lib/utils";

const offsetClass = [
  styles.itemOffset0,
  styles.itemOffset1,
  styles.itemOffset2,
] as const;

export function ImpactStatsSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className={cn(styles.section, "hero-cream")}
    >
      <div className={styles.container}>
        <ImpactStatsMotion>
          <div data-impact-observe="heading" className={styles.headingWrap}>
            <h2
              id="impact-title"
              data-impact-animate="heading"
              className={cn(styles.heading, styles.animateTarget)}
            >
              Clear financial direction for businesses ready to grow
            </h2>
          </div>

          <ul data-impact-observe="row" className={styles.grid}>
            {impactStats.map((stat, index) => {
              const isLight = index !== 1;
              const isValueEnd = index === 0;

              return (
                <li
                  key={stat.id}
                  data-impact-observe="card"
                  data-impact-index={index}
                  className={cn(styles.item, offsetClass[index])}
                >
                  <div
                    data-impact-animate="card"
                    className={cn(
                      styles.card,
                      styles.animateTarget,
                      isLight ? styles.cardLight : styles.cardDark,
                      isValueEnd
                        ? styles.layoutValueEnd
                        : styles.layoutValueStart,
                    )}
                  >
                    <p className={styles.label}>{stat.label}</p>

                    {isValueEnd ? (
                      <>
                        <p className={styles.description}>{stat.description}</p>
                        <div className={styles.spacer} aria-hidden="true" />
                        <div className={styles.metricRow}>
                          <p className={styles.metric}>
                            <span className="sr-only">{stat.value}</span>
                            <span
                              aria-hidden="true"
                              data-impact-counter={stat.numericTarget}
                            >
                              {stat.value}
                            </span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.spacer} aria-hidden="true" />
                        <div className={styles.metricRow}>
                          <p className={styles.metric}>
                            <span className="sr-only">{stat.value}</span>
                            <span
                              aria-hidden="true"
                              data-impact-counter={stat.numericTarget}
                            >
                              {stat.value}
                            </span>
                          </p>
                        </div>
                        <div className={styles.divider} aria-hidden="true" />
                        <p className={styles.description}>{stat.description}</p>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </ImpactStatsMotion>
      </div>
    </section>
  );
}
