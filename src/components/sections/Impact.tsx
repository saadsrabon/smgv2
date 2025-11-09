import { useTranslation } from 'react-i18next';
import { Building, Users, BookOpen, Heart, CheckCircle, Star } from 'lucide-react';

const Impact = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="impact" className="bg-light-surface scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('impact.title')}
          </h2>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('impact.subtitle')}
          </p>
        </div>

        {/* Vogdaburi Community Center Story */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary-teal/10 rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <h3 className={`text-2xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {t('impact.vogdaburi.title')}
                </h3>
              </div>
              <p className={`text-lg text-light-muted leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('impact.vogdaburi.description')}
              </p>
              <p className={`text-light-muted leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('impact.vogdaburi.story')}
              </p>
            </div>

            <div className="space-y-6">
              <h4 className={`text-xl font-semibold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'প্রধান অর্জন' : 'Key Achievements'}
              </h4>
              <div className="space-y-4">
                {(t('impact.vogdaburi.achievements', { returnObjects: true }) as string[]).map((achievement: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-light-bg rounded-xl p-6 text-center shadow-lg border border-light-border">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-light-text mb-2">500+</div>
            <div className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'পরিবার সেবা' : 'Families Served'}
            </div>
          </div>

          <div className="bg-light-bg rounded-xl p-6 text-center shadow-lg border border-light-border">
            <div className="w-16 h-16 bg-secondary-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-secondary-teal" />
            </div>
            <div className="text-3xl font-bold text-light-text mb-2">200+</div>
            <div className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'শিক্ষার্থী' : 'Students Trained'}
            </div>
          </div>

          <div className="bg-light-bg rounded-xl p-6 text-center shadow-lg border border-light-border">
            <div className="w-16 h-16 bg-secondary-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-secondary-orange" />
            </div>
            <div className="text-3xl font-bold text-light-text mb-2">1000+</div>
            <div className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'জীবন প্রভাবিত' : 'Lives Impacted'}
            </div>
          </div>

          <div className="bg-light-bg rounded-xl p-6 text-center shadow-lg border border-light-border">
            <div className="w-16 h-16 bg-secondary-pink/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-secondary-pink" />
            </div>
            <div className="text-3xl font-bold text-light-text mb-2">15+</div>
            <div className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'অংশীদার' : 'Partners'}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-secondary-teal/10 to-secondary-orange/10 rounded-2xl p-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className={`text-xl text-light-text mb-6 leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              "{i18n.language === 'bn' 
                ? 'সমাজ গড়ি ফাউন্ডেশনের মাধ্যমে আমাদের কমিউনিটি সত্যিই পরিবর্তিত হয়েছে। এখন আমাদের সন্তানরা ভালো শিক্ষা পাচ্ছে এবং আমরা সবাই একসাথে কাজ করছি।'
                : 'Through Shomajgori Foundation, our community has truly transformed. Now our children are getting quality education and we are all working together.'
              }"
            </blockquote>
            <div className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              <div className="font-semibold">
                {i18n.language === 'bn' ? 'ভগদাবুরি কমিউনিটি সদস্য' : 'Vogdaburi Community Member'}
              </div>
              <div className="text-sm">
                {i18n.language === 'bn' ? 'সফলতার গল্প' : 'Success Story'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
