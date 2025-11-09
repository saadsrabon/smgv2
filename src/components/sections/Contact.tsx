import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Users } from 'lucide-react';

const Contact = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="contact" className="bg-light-bg scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-light-surface rounded-2xl p-8 shadow-lg border border-light-border">
              <h3 className={`text-2xl font-bold text-light-text mb-6 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-light-text mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {i18n.language === 'bn' ? 'ঠিকানা' : 'Address'}
                    </h4>
                    <p className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary-teal" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-light-text mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {i18n.language === 'bn' ? 'ইমেইল' : 'Email'}
                    </h4>
                    <p className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('contact.email')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary-orange" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-light-text mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {i18n.language === 'bn' ? 'ফোন' : 'Phone'}
                    </h4>
                    <p className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('contact.phone')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary-teal/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className={`text-xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'আমাদের সাথে যোগ দিন' : 'Join Our Community'}
                </h3>
                <p className={`text-light-muted mb-6 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' 
                    ? 'আপনার কমিউনিটির উন্নয়নে অংশগ্রহণ করুন এবং ইতিবাচক পরিবর্তন আনুন।'
                    : 'Be part of your community\'s development and bring positive change.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-primary">
                    {t('contact.volunteer')}
                    <Users className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="btn-secondary">
                    {t('contact.cta')}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-light-surface rounded-2xl p-8 shadow-lg border border-light-border">
            <h3 className={`text-2xl font-bold text-light-text mb-6 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch'}
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium text-light-text mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? 'নাম' : 'Name'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={i18n.language === 'bn' ? 'আপনার নাম' : 'Your name'}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium text-light-text mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? 'ইমেইল' : 'Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={i18n.language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'বিষয়' : 'Subject'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={i18n.language === 'bn' ? 'বিষয় লিখুন' : 'Enter subject'}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {i18n.language === 'bn' ? 'বার্তা' : 'Message'}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={i18n.language === 'bn' ? 'আপনার বার্তা লিখুন' : 'Enter your message'}
                />
              </div>
              
              <Button type="submit" size="lg" className={`w-full btn-primary ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
