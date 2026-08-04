import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, SectionHeader } from '@/components/ui/Reveal';

import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

const Photos = () => {
  const { i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  const photos = [
    { id: 1, src: educationImg, title: i18n.language === 'bn' ? 'শিক্ষা কার্যক্রম' : 'Education Program', category: i18n.language === 'bn' ? 'শিক্ষা' : 'Education' },
    { id: 2, src: photo1, title: i18n.language === 'bn' ? 'সম্প্রদায় উন্নয়ন' : 'Community Development', category: i18n.language === 'bn' ? 'সামাজিক' : 'Social' },
    { id: 3, src: photo2, title: i18n.language === 'bn' ? 'সামাজিক কার্যক্রম' : 'Social Activities', category: i18n.language === 'bn' ? 'সামাজিক' : 'Social' },
    { id: 4, src: tailorImg, title: i18n.language === 'bn' ? 'দক্ষতা উন্নয়ন' : 'Skills Development', category: i18n.language === 'bn' ? 'অর্থনৈতিক' : 'Economic' },
  ];

  return (
    <section id="photos" className="bg-light-bg scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <Reveal>
          <SectionHeader
            fontClass={fontClass}
            eyebrow={i18n.language === 'bn' ? 'গ্যালারি' : 'In the field'}
            title={i18n.language === 'bn' ? 'আমাদের কার্যক্রমের ছবি' : 'Our Programs in Pictures'}
            description={
              i18n.language === 'bn'
                ? 'ভোগদাবুরিতে আমাদের সম্প্রদায় উন্নয়ন কার্যক্রমের কিছু মুহূর্ত'
                : 'Glimpses of our community development programs in Vogdaburi'
            }
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 mb-10">
          <Reveal className="sm:col-span-2 lg:col-span-6 lg:row-span-2">
            <figure className="group media-frame aspect-[4/3] lg:aspect-auto lg:h-full min-h-[240px] relative">
              <img
                src={photos[0].src}
                alt={photos[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-light-text/75 px-4 py-3 text-white">
                <span className={`text-xs uppercase tracking-wide opacity-90 ${fontClass}`}>{photos[0].category}</span>
                <p className={`font-semibold ${fontClass}`}>{photos[0].title}</p>
              </figcaption>
            </figure>
          </Reveal>
          {photos.slice(1).map((photo, i) => (
            <Reveal key={photo.id} delay={i === 0 ? 'sm' : i === 1 ? 'md' : 'lg'} className="lg:col-span-6">
              <figure className="group media-frame aspect-[16/10] relative h-full">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-light-text/75 px-4 py-3 text-white">
                  <span className={`text-xs uppercase tracking-wide opacity-90 ${fontClass}`}>{photo.category}</span>
                  <p className={`font-semibold text-sm ${fontClass}`}>{photo.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <Link to="/gallery">
            <Button size="lg" className={`btn-primary ${fontClass}`}>
              {i18n.language === 'bn' ? 'সব ছবি দেখুন' : 'View Full Gallery'}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Photos;
