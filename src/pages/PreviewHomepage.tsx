import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Programs from '@/components/sections/Programs';
import Impact from '@/components/sections/Impact';
import Photos from '@/components/sections/Photos';
import OngoingActivities from '@/components/sections/OngoingActivities';
import Contact from '@/components/sections/Contact';

export default function PreviewHomepage() {
  const [params] = useSearchParams();
  const { i18n } = useTranslation();
  const locale = params.get('locale') === 'bn' ? 'bn' : 'en';

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <div>
      <div className="bg-amber-100 text-amber-900 text-center text-sm py-2 font-medium">
        Preview Mode — {locale === 'bn' ? 'বাংলা' : 'English'}
      </div>
      <main>
        <Hero />
        <About />
        <Programs />
        <Impact />
        <Photos />
        <OngoingActivities />
        <Contact />
      </main>
    </div>
  );
}
