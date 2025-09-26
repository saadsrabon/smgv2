import { useTranslation } from 'react-i18next';
import { BookOpen, Heart, Users, TrendingUp, CheckCircle } from 'lucide-react';

const Programs = () => {
  const { t, i18n } = useTranslation();

  const programIcons = {
    education: BookOpen,
    health: Heart,
    social: Users,
    economic: TrendingUp,
  };

  const programColors = {
    education: 'primary',
    health: 'secondary-teal',
    social: 'secondary-orange',
    economic: 'secondary-pink',
  };

  return (
    <section id="programs" className="bg-light-bg">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('programs.title')}
          </h2>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('programs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(programIcons).map(([key, Icon]) => {
            const program = t(`programs.${key}`, { returnObjects: true }) as {title: string, description: string, features: string[]};
            const color = programColors[key as keyof typeof programColors];
            
            return (
              <div key={key} className="bg-light-surface text-light-text rounded-2xl p-8 hover:shadow-lg transition-shadow border border-light-border">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-${color}/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 text-${color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold text-light-text mb-3 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {program.title}
                    </h3>
                    <p className={`text-light-muted text-xl mb-6 leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      {program.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className={`text-xl text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary-teal/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className={`text-2xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'আমাদের প্রোগ্রামে অংশগ্রহণ করুন' : 'Join Our Programs'}
            </h3>
            <p className={`text-light-muted mb-6 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' 
                ? 'আমাদের কমিউনিটি প্রোগ্রামে অংশগ্রহণ করে আপনার এবং আপনার পরিবারের জীবনকে উন্নত করুন।'
                : 'Join our community programs and improve your life and your family\'s life.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`btn-primary ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'প্রোগ্রাম দেখুন' : 'View Programs'}
              </button>
              <button className={`btn-secondary ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'যোগাযোগ করুন' : 'Get in Touch'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
