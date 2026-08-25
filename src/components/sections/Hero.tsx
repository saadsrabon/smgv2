import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Play } from 'lucide-react';
import { useCmsSection } from '@/lib/cms/useHomepageContent';
import { getImageUrl } from '@/lib/cms/helpers';
import { usePublicImpactMetrics } from '@/lib/usePublicImpactMetrics';
import type { PublicImpactMetrics } from '@/lib/googleSheets';
import { Button } from '@/components/ui/button';

import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

const HERO_SLIDE_FALLBACKS = [educationImg, photo1, photo2, tailorImg];
const HERO_LABELS_EN = ['Education', 'Community', 'Engagement', 'Economic'];
const HERO_LABELS_BN = ['শিক্ষা', 'কমিউনিটি', 'সম্পৃক্ততা', 'অর্থনৈতিক'];

const heroStatConfig = [
  {
    key: 'familiesServed' as const,
    labelEn: 'Families served',
    labelBn: 'পরিবার',
  },
  {
    key: 'communityPrograms' as const,
    labelEn: 'Programs',
    labelBn: 'কার্যক্রম',
  },
  {
    key: 'livesImpacted' as const,
    labelEn: 'Lives impacted',
    labelBn: 'প্রভাব',
  },
] as const;

function HeroHeadline({ language, title }: { language: string; title: string }) {
  const fontClass = language === 'bn' ? 'font-bengali' : 'font-english hero-headline-en';

  const highlight = (before: string, word: string, after: string) => (
    <h1
      className={`text-[2.25rem] sm:text-[2.65rem] lg:text-[3.125rem] font-bold leading-[1.12] tracking-tight text-light-text ${fontClass}`}
    >
      {before}
      <span className="relative inline-block text-primary">
        {word}
        <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" aria-hidden />
      </span>
      {after}
    </h1>
  );

  if (language === 'en') {
    const m = title.match(/^(.*?\b)(Smart)(\b.*)$/i);
    if (m) return highlight(m[1], m[2], m[3]);
  }
  if (language === 'bn' && title.includes('স্মার্ট')) {
    const [before, after] = title.split('স্মার্ট');
    return highlight(before, 'স্মার্ট', after);
  }

  return (
    <h1
      className={`text-[2.25rem] sm:text-[2.65rem] lg:text-[3.125rem] font-bold leading-[1.12] text-light-text ${fontClass}`}
    >
      {title}
    </h1>
  );
}

const Hero = () => {
  const { t, i18n } = useTranslation();
  const hero = useCmsSection('hero');
  const { data: publicMetrics } = usePublicImpactMetrics();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fallbackSlides = HERO_SLIDE_FALLBACKS;
  const defaultLabels = i18n.language === 'bn' ? HERO_LABELS_BN : HERO_LABELS_EN;
  const slideLabels = (hero.slideLabels as string[]) || defaultLabels;

  const slides = fallbackSlides.map((fb, i) => ({
    src: getImageUrl(hero, `slide-${i}`, fb),
    label: slideLabels[i] || defaultLabels[i] || '',
  }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const scrollTo = (id: string) => {
    const target = id.replace(/^#/, '');
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const watchStory = () => {
    scrollTo('about');
    window.setTimeout(() => window.dispatchEvent(new Event('about:playVideo')), 650);
  };

  const getMetricValue = (key: keyof PublicImpactMetrics) => publicMetrics?.[key] ?? '—';

  const stats = heroStatConfig.map((stat) => ({
    v: getMetricValue(stat.key),
    l: i18n.language === 'bn' ? stat.labelBn : stat.labelEn,
  }));

  const title = String(hero.title || t('hero.title'));
  const subtitle = String(hero.subtitle || t('hero.subtitle'));
  const ctaText = String(hero.ctaText || t('hero.cta'));
  const ctaLink = String(hero.ctaLink || '#about');

  return (
    <section
      id="home"
      className="scroll-mt-[5.25rem] relative overflow-hidden bg-light-bg pt-[5.25rem]"
    >
      <div className="hero-bg-illustration pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-custom relative z-10 py-10 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          <div className="lg:col-span-6 space-y-5">
            <HeroHeadline language={i18n.language} title={title} />

            <p className={`text-lg md:text-xl text-light-muted leading-relaxed max-w-md ${fontClass}`}>{subtitle}</p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <Button
                size="lg"
                className={`btn-primary rounded-full px-6 w-full sm:w-auto justify-center ${fontClass}`}
                onClick={() => scrollTo(ctaLink)}
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden />
              </Button>
              <button
                type="button"
                onClick={watchStory}
                className={`btn-hero-video w-full sm:w-auto ${fontClass}`}
              >
                <span className="btn-hero-video-icon" aria-hidden>
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </span>
                <span className="text-left leading-snug">
                  {i18n.language === 'bn' ? 'আমাদের গল্প দেখুন' : 'Watch our story'}
                </span>
              </button>
            </div>

            <div className="flex gap-6 pt-3 border-t border-light-border/80">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-light-text tabular-nums">{s.v}</div>
                  <div className={`text-xs text-light-muted ${fontClass}`}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative pb-10 lg:pb-12">
            <div className="relative mx-auto max-w-lg lg:max-w-none lg:ml-auto">
              <div className="hero-photo-main relative aspect-[5/4] max-h-[min(54vh,420px)] overflow-hidden rounded-2xl border border-light-border shadow-[0_12px_40px_rgba(47,170,160,0.12)]">
                {slides.map((slide, i) => (
                  <img
                    key={`slide-${i}`}
                    src={slide.src}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      i === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
                <div
                  className={`absolute bottom-3 left-3 rounded-full bg-light-bg/95 px-3 py-1 text-xs font-semibold text-primary border border-primary/20 ${fontClass}`}
                >
                  {slides[currentImageIndex].label}
                </div>
              </div>

              {/* Thumbnail strip — brand ring on active */}
              <div className="absolute -bottom-3 right-4 flex gap-2 lg:-bottom-4 lg:right-6">
                {slides.map((slide, i) => (
                  <button
                    key={`thumb-${i}`}
                    type="button"
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-14 w-14 overflow-hidden rounded-xl border-2 transition-all ${
                      i === currentImageIndex
                        ? 'border-primary scale-105 shadow-md'
                        : 'border-light-border opacity-80 hover:opacity-100'
                    }`}
                    aria-label={slide.label}
                  >
                    <img src={slide.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
