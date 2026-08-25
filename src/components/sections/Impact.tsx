import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CommunityCenterIcon,
  FamiliesImpactIcon,
  HealthProgramIcon,
  IconTile,
  LivesImpactIcon,
  StudentsImpactIcon,
} from '@/components/icons/FoundationIcons';
import { Reveal, SectionHeader } from '@/components/ui/Reveal';
import { useImpactSection } from '@/lib/cms/useHomepageContent';
import { getImageUrl } from '@/lib/cms/helpers';
import { usePublicImpactMetrics } from '@/lib/usePublicImpactMetrics';
import type { PublicImpactMetrics } from '@/lib/googleSheets';
import type { ImpactTestimonialContent } from '@/lib/cms/sections/impact';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import { useTranslation } from 'react-i18next';

const TESTIMONIAL_INTERVAL_MS = 6000;

const impactMetricConfig = [
  {
    key: 'familiesServed' as const,
    labelBn: 'পরিবার সেবা',
    labelEn: 'Families Served',
    Icon: FamiliesImpactIcon,
    accent: '#2faaa0',
  },
  {
    key: 'tutoringEnrollment' as const,
    labelBn: 'শিক্ষার্থী তালিকাভুক্তি',
    labelEn: 'Students Enrolled',
    Icon: StudentsImpactIcon,
    accent: '#0d9488',
  },
  {
    key: 'livesImpacted' as const,
    labelBn: 'জীবন প্রভাবিত',
    labelEn: 'Lives Impacted',
    Icon: LivesImpactIcon,
    accent: '#c2410c',
  },
  {
    key: 'healthParticipants' as const,
    labelBn: 'স্বাস্থ্য সুবিধাপ্রাপ্ত',
    labelEn: 'Health Participants',
    Icon: HealthProgramIcon,
    accent: '#be185d',
  },
] as const;

function TestimonialSlider({
  items,
  fontClass,
}: {
  items: ImpactTestimonialContent[];
  fontClass: string;
}) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  useEffect(() => {
    setIndex(0);
  }, [items]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, TESTIMONIAL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  if (!current?.quote) return null;

  return (
    <figure className="quote-block card-editorial p-8 md:p-12 md:pt-14 text-center max-w-4xl mx-auto">
      <span className="quote-mark quote-mark-open" aria-hidden>
        “
      </span>
      <span className="quote-mark quote-mark-close" aria-hidden>
        ”
      </span>

      <div className="flex justify-center gap-1 mb-6 relative z-10" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
        ))}
      </div>

      <div className="relative z-10 min-h-[12rem] md:min-h-[10rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${index}-${current.quote}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <blockquote className={`text-xl md:text-2xl text-light-text leading-relaxed font-medium px-4 md:px-10 ${fontClass}`}>
              {current.quote}
            </blockquote>
            {(current.author || current.role) && (
              <figcaption className={`mt-8 pt-6 border-t border-light-border/80 text-light-muted ${fontClass}`}>
                {current.author ? (
                  <span className="block font-semibold text-light-text">{current.author}</span>
                ) : null}
                {current.role ? <span className="text-sm">{current.role}</span> : null}
              </figcaption>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </figure>
  );
}

const Impact = () => {
  const { i18n } = useTranslation();
  const impact = useImpactSection();
  const { data: publicMetrics } = usePublicImpactMetrics();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  const getMetricValue = (key: keyof PublicImpactMetrics) => publicMetrics?.[key] ?? '—';
  const featuredImg = getImageUrl(impact, 'featured-story', photo2);
  const testimonials = impact.testimonials.filter((item) => item.quote.trim());

  return (
    <section id="impact" className="section-band-alt scroll-mt-24 md:scroll-mt-32 relative overflow-hidden">
      <div className="impact-bg-illustration pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-custom section-padding relative z-10">
        <Reveal>
          <SectionHeader
            fontClass={fontClass}
            eyebrow={impact.eyebrow}
            title={impact.title}
            description={impact.subtitle}
          />
        </Reveal>

        <Reveal className="mb-16">
          <article className="card-editorial overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 media-frame lg:rounded-none lg:border-0 lg:border-r border-light-border min-h-[260px]">
                <img src={featuredImg} alt={impact.storyTitle} className="h-full min-h-[260px] w-full object-cover" loading="lazy" />
              </div>
              <div className="lg:col-span-7 p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <IconTile variant="round" size="sm">
                    <CommunityCenterIcon className="h-full w-full" accent="#2faaa0" />
                  </IconTile>
                  <h3 className={`text-2xl font-bold text-light-text ${fontClass}`}>{impact.storyTitle}</h3>
                </div>
                <p className={`prose-ngo ${fontClass}`}>{impact.storyDescription}</p>
                <p className={`prose-ngo ${fontClass}`}>{impact.storyBody}</p>
                <div className="pt-4 border-t border-light-border">
                  <h4 className={`text-sm font-semibold uppercase tracking-wide text-light-muted mb-4 ${fontClass}`}>
                    {impact.achievementsHeading}
                  </h4>
                  <ul className={`space-y-3 ${fontClass}`}>
                    {impact.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3 text-light-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {impactMetricConfig.map((metric, i) => (
            <Reveal key={metric.labelEn} delay={i === 0 ? 'none' : i === 1 ? 'sm' : i === 2 ? 'md' : 'lg'}>
              <div className="card-editorial p-6 text-center h-full">
                <div className="mx-auto mb-4 flex justify-center">
                  <IconTile variant="round" size="sm">
                    <metric.Icon className="h-full w-full" accent={metric.accent} />
                  </IconTile>
                </div>
                <div className="stat-value">{getMetricValue(metric.key)}</div>
                <div className={`stat-label ${fontClass}`}>
                  {i18n.language === 'bn' ? metric.labelBn : metric.labelEn}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {testimonials.length > 0 && (
          <Reveal>
            <TestimonialSlider items={testimonials} fontClass={fontClass} />
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Impact;
