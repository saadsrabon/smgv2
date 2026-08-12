import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  EconomicProgramIcon,
  EducationProgramIcon,
  HealthProgramIcon,
  IconTile,
  SocialProgramIcon,
} from '@/components/icons/FoundationIcons';
import { Reveal } from '@/components/ui/Reveal';
import { useCmsSection } from '@/lib/cms/useHomepageContent';
import { getImageUrl } from '@/lib/cms/helpers';
import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

const programConfig = {
  education: { Icon: EducationProgramIcon, accent: '#2faaa0', image: educationImg },
  health: { Icon: HealthProgramIcon, accent: '#0d9488', image: photo2 },
  social: { Icon: SocialProgramIcon, accent: '#c2410c', image: photo1 },
  economic: { Icon: EconomicProgramIcon, accent: '#be185d', image: tailorImg },
} as const;

const programKeys = ['education', 'health', 'social', 'economic'] as const;

function useSlidesPerView() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setCount(3);
      else if (window.matchMedia('(min-width: 640px)').matches) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

const Programs = () => {
  const { t, i18n } = useTranslation();
  const programsCms = useCmsSection('programs');
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';
  const slidesPerView = useSlidesPerView();
  const [offset, setOffset] = useState(0);

  const maxOffset = Math.max(0, programKeys.length - slidesPerView);

  useEffect(() => {
    setOffset((prev) => Math.min(prev, maxOffset));
  }, [maxOffset]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goPrev = () => setOffset((o) => Math.max(0, o - 1));
  const goNext = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const gapRem = 1.25;
  const slideBasis =
    slidesPerView === 1
      ? '100%'
      : `calc((100% - ${(slidesPerView - 1) * gapRem}rem) / ${slidesPerView})`;
  const slideStep = `calc((100% - ${(slidesPerView - 1) * gapRem}rem) / ${slidesPerView} + ${gapRem}rem)`;

  return (
    <section id="programs" className="relative overflow-hidden bg-light-bg scroll-mt-20">
      <div className="programs-bg-illustration pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-custom section-padding relative z-10 !pb-12 md:!pb-14">
        <Reveal className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <p className={`section-eyebrow text-base ${fontClass}`}>
            {String(programsCms.eyebrow || (i18n.language === 'bn' ? 'আমাদের কাজ' : 'What we do'))}
          </p>
          <h2 className={`section-title ${fontClass}`}>{String(programsCms.title || t('programs.title'))}</h2>
          <p className={`section-lead mx-auto mt-3 ${fontClass}`}>{String(programsCms.subtitle || t('programs.subtitle'))}</p>
          <p className={`mt-4 text-lg md:text-xl font-semibold text-primary ${fontClass}`}>
            {String(programsCms.tagline || (i18n.language === 'bn' ? 'চলুন একসাথে পরিবর্তন আনি' : "Let's create change together"))}
          </p>
        </Reveal>

        <div className="relative">
          {maxOffset > 0 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={offset === 0}
                className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 sm:flex h-10 w-10 items-center justify-center rounded-full border border-light-border bg-light-bg shadow-sm text-light-text transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none -translate-x-1/2 lg:-translate-x-full lg:left-0"
                aria-label={i18n.language === 'bn' ? 'আগের প্রোগ্রাম' : 'Previous programs'}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={offset >= maxOffset}
                className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 sm:flex h-10 w-10 items-center justify-center rounded-full border border-light-border bg-light-bg shadow-sm text-light-text transition-colors hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none translate-x-1/2 lg:translate-x-full lg:right-0"
                aria-label={i18n.language === 'bn' ? 'পরের প্রোগ্রাম' : 'Next programs'}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: offset === 0 ? undefined : `translateX(calc(-${offset} * ${slideStep}))`,
              }}
            >
              {programKeys.map((key) => {
                const program = t(`programs.${key}`, { returnObjects: true }) as {
                  title: string;
                  description: string;
                  features: string[];
                };
                const { Icon, accent, image } = programConfig[key];
                const imageSrc = getImageUrl(programsCms, key, image);

                return (
                  <article
                    key={key}
                    className="group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-light-border bg-light-surface shadow-sm transition-shadow hover:shadow-md"
                    style={{ flexBasis: slideBasis }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={program.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-light-text/40 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <IconTile size="sm">
                          <Icon className="h-full w-full" accent={accent} />
                        </IconTile>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <h3 className={`text-xl md:text-2xl font-bold text-light-text leading-snug mb-2 ${fontClass}`}>
                        {program.title}
                      </h3>
                      <p className={`text-base md:text-lg text-light-muted leading-relaxed mb-4 line-clamp-3 ${fontClass}`}>
                        {program.description}
                      </p>

                      <ul className={`space-y-2 mb-5 flex-1 ${fontClass}`}>
                        {program.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex gap-2 text-sm md:text-base text-light-muted leading-snug">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={scrollToContact}
                        className={`inline-flex items-center gap-1 text-base font-semibold text-primary hover:gap-2 transition-all ${fontClass}`}
                      >
                        {i18n.language === 'bn' ? 'আরও জানুন' : 'Learn more'}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {maxOffset > 0 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: maxOffset + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOffset(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === offset ? 'w-8 bg-primary' : 'w-2 bg-light-border hover:bg-primary/40'
                  }`}
                  aria-label={`${i18n.language === 'bn' ? 'স্লাইড' : 'Slide'} ${i + 1}`}
                  aria-current={i === offset}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Programs;
