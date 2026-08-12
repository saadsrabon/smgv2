import { useTranslation } from 'react-i18next';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { useCmsSection } from '@/lib/cms/useHomepageContent';
import { getImageUrl } from '@/lib/cms/helpers';

import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';

const categoryStyles: Record<string, { badge: string; bar: string }> = {
  Education: { badge: 'bg-primary/10 text-primary', bar: 'bg-primary' },
  Digital: { badge: 'bg-secondary-teal/10 text-secondary-teal', bar: 'bg-secondary-teal' },
  Health: { badge: 'bg-secondary-orange/10 text-secondary-orange', bar: 'bg-secondary-orange' },
  শিক্ষা: { badge: 'bg-primary/10 text-primary', bar: 'bg-primary' },
  ডিজিটাল: { badge: 'bg-secondary-teal/10 text-secondary-teal', bar: 'bg-secondary-teal' },
  স্বাস্থ্য: { badge: 'bg-secondary-orange/10 text-secondary-orange', bar: 'bg-secondary-orange' },
};

type ActivityItem = {
  title: string;
  description: string;
  location: string;
  schedule: string;
  category: string;
  participants: number;
};

const activityImages = [educationImg, educationImg, photo1, photo2];

const OngoingActivities = () => {
  const { t, i18n } = useTranslation();
  const activitiesCms = useCmsSection('activities');
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  const localeItems = t('activities.items', { returnObjects: true }) as ActivityItem[];
  const cmsActivities = (activitiesCms.activities as ActivityItem[] | undefined)?.length
    ? (activitiesCms.activities as ActivityItem[])
    : localeItems;

  const activities = cmsActivities.map((item, i) => ({
    id: i + 1,
    image: getImageUrl(activitiesCms, `activity-${i}`, activityImages[i]),
    ...item,
  }));

  const eyebrow = String(activitiesCms.eyebrow || t('activities.eyebrow'));
  const title = String(activitiesCms.title || t('activities.title'));
  const subtitle = String(activitiesCms.subtitle || t('activities.subtitle'));

  return (
    <section id="activities" className="relative scroll-mt-20 overflow-hidden bg-light-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(47,170,160,0.06)_0%,transparent_42%)]"
        aria-hidden
      />

      <div className="container-custom relative section-padding !py-10 md:!py-12">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <p className={`section-eyebrow text-base ${fontClass}`}>{eyebrow}</p>
            <h2 className={`section-title mb-3 ${fontClass}`}>{title}</h2>
            <p className={`section-lead max-w-xl ${fontClass}`}>{subtitle}</p>
          </div>
          <p className={`text-lg font-semibold text-primary ${fontClass}`}>
            {activities.length} {t('activities.activePrograms')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {activities.map((activity, index) => {
            const styles = categoryStyles[activity.category] ?? categoryStyles.Education;
            return (
              <Reveal key={activity.id} delay={index === 0 ? undefined : index === 1 ? 'sm' : index === 2 ? 'md' : 'lg'}>
                <article className="group card-editorial overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge} ${fontClass}`}>
                      {activity.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className={`text-xl font-bold text-light-text mb-2 ${fontClass}`}>{activity.title}</h3>
                    <p className={`text-light-muted text-sm leading-relaxed mb-4 flex-1 ${fontClass}`}>{activity.description}</p>

                    <ul className={`space-y-2 text-sm text-light-muted mb-4 ${fontClass}`}>
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
                        <span>{activity.schedule}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
                        <span>{activity.location}</span>
                      </li>
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t border-light-border">
                      <span className={`text-sm font-medium text-primary ${fontClass}`}>
                        {activity.participants} {t('activities.participants')}
                      </span>
                      <a
                        href="#contact"
                        className={`inline-flex items-center gap-1 text-sm font-semibold text-light-text hover:text-primary transition-colors ${fontClass}`}
                      >
                        {t('contact.cta')}
                        <ArrowUpRight className="w-4 h-4" aria-hidden />
                      </a>
                    </div>
                    <div className={`mt-3 h-1 w-full rounded-full ${styles.bar}`} aria-hidden />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OngoingActivities;
