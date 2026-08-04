import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';
import educationImg from '@/assets/hero/education-B1rO235h.jpeg';

const About = () => {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoUrl =
    i18n.language === 'bn'
      ? 'https://www.youtube.com/embed/DWB6Bzk9IuQ?autoplay=1&rel=0&modestbranding=1'
      : 'https://www.youtube.com/embed/ToLHHAl9KVk?autoplay=1&rel=0&modestbranding=1';

  useEffect(() => {
    const triggerVideoPlay = () => setIsVideoPlaying(true);
    window.addEventListener('about:playVideo', triggerVideoPlay);
    return () => window.removeEventListener('about:playVideo', triggerVideoPlay);
  }, []);

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [i18n.language]);

  return (
    <section id="about" className="bg-light-surface scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <h2 className={`text-center text-3xl md:text-4xl font-bold text-light-text mb-10 md:mb-12 ${fontClass}`}>
          {t('about.title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div className={`space-y-5 text-light-text leading-relaxed ${fontClass}`}>
            <p>{t('about.official.statement')}</p>
            <p>{t('about.official.purpose')}</p>

            <dl className="mt-8 space-y-3 pt-6 border-t border-light-border">
              <div>
                <dt className="font-semibold">{t('about.official.legalNameLabel')}</dt>
                <dd>{t('about.official.legalName')}</dd>
              </div>
              <div>
                <dt className="font-semibold">{t('about.official.domainLabel')}</dt>
                <dd>
                  <a href="https://shomajgori.org" className="text-primary hover:underline">
                    {t('about.official.domain')}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">{t('about.official.emailLabel')}</dt>
                <dd>
                  <a href={`mailto:${t('about.official.email')}`} className="text-primary hover:underline break-all">
                    {t('about.official.email')}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative w-full lg:sticky lg:top-28">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-light-bg border border-light-border">
              {!isVideoPlaying ? (
                <div className="relative flex h-full w-full items-center justify-center">
                  <img
                    src={educationImg}
                    alt={i18n.language === 'bn' ? 'সমাজ গড়ি ফাউন্ডেশন ভিডিও' : 'Shomajgori Foundation video'}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/35 to-secondary-teal/35" />

                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="relative z-10 group"
                    aria-label={i18n.language === 'bn' ? 'ভিডিও চালান' : 'Play video'}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/30 video-ripple" />
                      <div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-2xl transition-transform duration-300 group-hover:scale-110 video-play-button">
                        <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
                      </div>
                    </div>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                    <h3 className={`text-lg font-bold text-white mb-1 ${fontClass}`}>
                      {i18n.language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
                    </h3>
                    <p className={`text-sm text-white/90 ${fontClass}`}>
                      {i18n.language === 'bn'
                        ? 'সমাজ গড়ি ফাউন্ডেশনের কাজের গল্প দেখুন'
                        : "Watch the story of Shomajgori Foundation's work"}
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={i18n.language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
