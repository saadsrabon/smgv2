import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import {
  CommunityCenterIcon,
  FamiliesImpactIcon,
  IconTile,
  LivesImpactIcon,
  PartnersImpactIcon,
  StudentsImpactIcon,
} from '@/components/icons/FoundationIcons';
import { Reveal, SectionHeader } from '@/components/ui/Reveal';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';

const impactMetrics = [
  { value: '500+', labelBn: 'পরিবার সেবা', labelEn: 'Families Served', Icon: FamiliesImpactIcon, accent: '#2faaa0' },
  { value: '200+', labelBn: 'শিক্ষার্থী', labelEn: 'Students Trained', Icon: StudentsImpactIcon, accent: '#0d9488' },
  { value: '1000+', labelBn: 'জীবন প্রভাবিত', labelEn: 'Lives Impacted', Icon: LivesImpactIcon, accent: '#c2410c' },
  { value: '15+', labelBn: 'অংশীদার', labelEn: 'Partners', Icon: PartnersImpactIcon, accent: '#be185d' },
] as const;

const Impact = () => {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';
  const achievements = t('impact.vogdaburi.achievements', { returnObjects: true }) as string[];

  return (
    <section id="impact" className="section-band-alt scroll-mt-24 md:scroll-mt-32 relative overflow-hidden">
      <div className="impact-bg-illustration pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-custom section-padding relative z-10">
        <Reveal>
          <SectionHeader
            fontClass={fontClass}
            eyebrow={i18n.language === 'bn' ? 'প্রভাব' : 'Impact'}
            title={t('impact.title')}
            description={t('impact.subtitle')}
          />
        </Reveal>

        <Reveal className="mb-16">
          <article className="card-editorial overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 media-frame lg:rounded-none lg:border-0 lg:border-r border-light-border min-h-[260px]">
                <img src={photo2} alt={t('impact.vogdaburi.title')} className="h-full min-h-[260px] w-full object-cover" loading="lazy" />
              </div>
              <div className="lg:col-span-7 p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <IconTile variant="round" size="sm">
                    <CommunityCenterIcon className="h-full w-full" accent="#2faaa0" />
                  </IconTile>
                  <h3 className={`text-2xl font-bold text-light-text ${fontClass}`}>{t('impact.vogdaburi.title')}</h3>
                </div>
                <p className={`prose-ngo ${fontClass}`}>{t('impact.vogdaburi.description')}</p>
                <p className={`prose-ngo ${fontClass}`}>{t('impact.vogdaburi.story')}</p>
                <div className="pt-4 border-t border-light-border">
                  <h4 className={`text-sm font-semibold uppercase tracking-wide text-light-muted mb-4 ${fontClass}`}>
                    {i18n.language === 'bn' ? 'প্রধান অর্জন' : 'Key achievements'}
                  </h4>
                  <ul className={`space-y-3 ${fontClass}`}>
                    {achievements.map((achievement) => (
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
          {impactMetrics.map((metric, i) => (
            <Reveal key={metric.labelEn} delay={i === 0 ? 'none' : i === 1 ? 'sm' : i === 2 ? 'md' : 'lg'}>
              <div className="card-editorial p-6 text-center h-full">
                <div className="mx-auto mb-4 flex justify-center">
                  <IconTile variant="round" size="sm">
                    <metric.Icon className="h-full w-full" accent={metric.accent} />
                  </IconTile>
                </div>
                <div className="stat-value">{metric.value}</div>
                <div className={`stat-label ${fontClass}`}>
                  {i18n.language === 'bn' ? metric.labelBn : metric.labelEn}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
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
            <blockquote className={`relative z-10 text-xl md:text-2xl text-light-text leading-relaxed font-medium px-4 md:px-10 ${fontClass}`}>
              {i18n.language === 'bn'
                ? 'সমাজ গড়ি ফাউন্ডেশনের মাধ্যমে আমাদের কমিউনিটি সত্যিই পরিবর্তিত হয়েছে। এখন আমাদের সন্তানরা ভালো শিক্ষা পাচ্ছে এবং আমরা সবাই একসাথে কাজ করছি।'
                : 'Through Shomajgori Foundation, our community has truly transformed. Now our children are getting quality education and we are all working together.'}
            </blockquote>
            <figcaption className={`relative z-10 mt-8 pt-6 border-t border-light-border/80 text-light-muted ${fontClass}`}>
              <span className="block font-semibold text-light-text">
                {i18n.language === 'bn' ? 'ভগদাবুরি কমিউনিটি সদস্য' : 'Vogdaburi Community Member'}
              </span>
              <span className="text-sm">{i18n.language === 'bn' ? 'সফলতার গল্প' : 'Community voice'}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};

export default Impact;
