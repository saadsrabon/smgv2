import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';
import { Reveal, SectionHeader } from '@/components/ui/Reveal';

const aboutVideoPreview = '/about-video-preview.png';

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
    <section id="about" className="section-band-alt scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <SectionHeader
          align="center"
          fontClass={fontClass}
          eyebrow={i18n.language === 'bn' ? 'আমাদের পরিচয়' : 'Who we are'}
          title={t('about.title')}
        />

        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-12">
          <Reveal className="mx-auto w-full max-w-4xl">
            <div className="about-video-frame media-frame relative w-full aspect-video sm:aspect-[16/10] shadow-[0_16px_48px_rgba(15,23,42,0.12)]">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-light-bg">
                  <img
                    src={aboutVideoPreview}
                    alt={i18n.language === 'bn' ? 'আমাদের গল্প — ভিডিও প্রিভিউ' : 'Our Story — video preview'}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-light-text/5 transition-colors group-hover:bg-light-text/10 pointer-events-none" aria-hidden />
                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="relative z-10 group"
                    aria-label={i18n.language === 'bn' ? 'ভিডিও চালান' : 'Play video'}
                  >
                    <div className="relative flex h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem] items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white/40 video-play-button transition-transform group-hover:scale-105">
                      <Play className="ml-1 h-8 w-8 sm:h-9 sm:w-9" fill="currentColor" aria-hidden />
                    </div>
                  </button>
                  {i18n.language === 'en' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-light-text/50 to-transparent px-5 py-4 pointer-events-none">
                      <p className={`text-sm font-semibold text-white drop-shadow-sm ${fontClass}`}>Our Story</p>
                    </div>
                  )}
                </div>
              ) : (
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={i18n.language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
                />
              )}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Reveal delay="sm" className={`prose-ngo text-light-text ${fontClass}`}>
              <p>{t('about.official.statement')}</p>
            </Reveal>
            <Reveal delay="md" className={`prose-ngo text-light-text ${fontClass}`}>
              <p>{t('about.official.purpose')}</p>
            </Reveal>
          </div>

          <Reveal delay="lg">
            <dl
              className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-light-border text-light-text ${fontClass}`}
            >
              <div>
                <dt className="text-sm font-semibold text-light-muted">{t('about.official.legalNameLabel')}</dt>
                <dd className="mt-1 font-medium">{t('about.official.legalName')}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-light-muted">{t('about.official.domainLabel')}</dt>
                <dd className="mt-1">
                  <a href="https://shomajgori.org" className="text-primary hover:underline font-medium">
                    {t('about.official.domain')}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-light-muted">{t('about.official.emailLabel')}</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${t('about.official.email')}`}
                    className="text-primary hover:underline font-medium break-all"
                  >
                    {t('about.official.email')}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
