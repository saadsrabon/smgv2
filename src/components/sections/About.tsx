import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  return (
    <section id="about" className="bg-light-surface scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-light-text mb-8 ${fontClass}`}>
            {t('about.title')}
          </h2>

          <div className={`space-y-5 text-light-text leading-relaxed ${fontClass}`}>
            <p>{t('about.official.statement')}</p>
            <p>{t('about.official.purpose')}</p>
          </div>

          <dl className={`mt-8 space-y-3 text-light-text ${fontClass}`}>
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
                <a href={`mailto:${t('about.official.email')}`} className="text-primary hover:underline">
                  {t('about.official.email')}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
