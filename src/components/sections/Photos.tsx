import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, SectionHeader } from '@/components/ui/Reveal';
import { useCmsSection } from '@/lib/cms/useHomepageContent';
import { getImageUrl } from '@/lib/cms/helpers';

import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

type PhotoItem = { title: string; category: string };

const Photos = () => {
  const { t, i18n } = useTranslation();
  const photosCms = useCmsSection('photos');
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  const localeItems = t('photos.items', { returnObjects: true }) as PhotoItem[];
  const fallbacks = [educationImg, photo1, photo2, tailorImg];

  const photos = fallbacks.map((fb, i) => {
    const item = localeItems[i] ?? { title: '', category: '' };
    return {
      id: i + 1,
      src: getImageUrl(photosCms, `photo-${i}`, fb),
      title: item.title,
      category: item.category,
    };
  });

  const eyebrow = String(photosCms.eyebrow || t('photos.eyebrow'));
  const title = String(photosCms.title || t('photos.title'));
  const subtitle = String(photosCms.subtitle || t('photos.subtitle'));
  const viewGallery = String(photosCms.viewGalleryText || t('photos.viewGallery'));

  return (
    <section id="photos" className="bg-light-bg scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <Reveal>
          <SectionHeader
            fontClass={fontClass}
            eyebrow={eyebrow}
            title={title}
            description={subtitle}
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
              {viewGallery}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Photos;
