import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Users } from 'lucide-react';
import { sendContactEmail } from '@/lib/emailjs';
import { openVolunteerModal } from '@/hooks/useVolunteerModal';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const form = new FormData(e.currentTarget);

    try {
      await sendContactEmail({
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        subject: String(form.get('subject') ?? 'Website contact'),
        message: String(form.get('message') ?? ''),
      });
      setStatus('success');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-light-bg scroll-mt-24 md:scroll-mt-32">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-light-text mb-4 ${fontClass}`}>
            {t('contact.title')}
          </h2>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${fontClass}`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-light-surface rounded-2xl p-8 shadow-lg border border-light-border">
              <p className={`text-sm font-medium text-primary mb-6 ${fontClass}`}>
                {t('contact.nonprofitNote')}
              </p>

              <h3 className={`text-2xl font-bold text-light-text mb-6 ${fontClass}`}>
                {i18n.language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-light-text mb-1 ${fontClass}`}>
                      {i18n.language === 'bn' ? 'ঠিকানা' : 'Address'}
                    </h4>
                    <p className={`text-light-muted ${fontClass}`}>{t('contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-light-text mb-1 ${fontClass}`}>
                      {i18n.language === 'bn' ? 'ইমেইল' : 'Email'}
                    </h4>
                    <a href={`mailto:${t('contact.email')}`} className={`text-primary hover:underline ${fontClass}`}>
                      {t('contact.email')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-light-text mb-1 ${fontClass}`}>
                      {i18n.language === 'bn' ? 'ফোন' : 'Phone'}
                    </h4>
                    <a href={`tel:${t('contact.phone').replace(/[^\d+]/g, '')}`} className={`text-light-muted hover:text-primary ${fontClass}`}>
                      {t('contact.phone')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-light-surface rounded-2xl p-8 border border-light-border">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className={`text-xl font-bold text-light-text mb-4 ${fontClass}`}>
                  {i18n.language === 'bn' ? 'আমাদের সাথে যোগ দিন' : 'Join Our Community'}
                </h3>
                <p className={`text-light-muted mb-6 ${fontClass}`}>
                  {i18n.language === 'bn'
                    ? 'আপনার কমিউনিটির উন্নয়নে অংশগ্রহণ করুন এবং ইতিবাচক পরিবর্তন আনুন।'
                    : "Be part of your community's development and bring positive change."}
                </p>
                <Button size="lg" className="btn-primary" onClick={openVolunteerModal}>
                  {t('contact.volunteer')}
                  <Users className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-light-surface rounded-2xl p-8 shadow-lg border border-light-border">
            <h3 className={`text-2xl font-bold text-light-text mb-6 ${fontClass}`}>
              {i18n.language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch'}
            </h3>

            {status === 'success' && (
              <p className={`mb-4 text-sm text-primary ${fontClass}`} role="status">
                {t('contact.formSuccess')}
              </p>
            )}
            {status === 'error' && (
              <p className={`mb-4 text-sm text-red-600 ${fontClass}`} role="alert">
                {t('contact.formError')}
              </p>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className={`block text-sm font-medium text-light-text mb-2 ${fontClass}`}>
                    {i18n.language === 'bn' ? 'নাম' : 'Name'}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={i18n.language === 'bn' ? 'আপনার নাম' : 'Your name'}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={`block text-sm font-medium text-light-text mb-2 ${fontClass}`}>
                    {i18n.language === 'bn' ? 'ইমেইল' : 'Email'}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={i18n.language === 'bn' ? 'আপনার ইমেইল' : 'Your email'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className={`block text-sm font-medium text-light-text mb-2 ${fontClass}`}>
                  {i18n.language === 'bn' ? 'বিষয়' : 'Subject'}
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={i18n.language === 'bn' ? 'বিষয় লিখুন' : 'Enter subject'}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={`block text-sm font-medium text-light-text mb-2 ${fontClass}`}>
                  {i18n.language === 'bn' ? 'বার্তা' : 'Message'}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={i18n.language === 'bn' ? 'আপনার বার্তা লিখুন' : 'Enter your message'}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className={`w-full btn-primary ${fontClass}`}
              >
                {isSubmitting
                  ? (i18n.language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...')
                  : (i18n.language === 'bn' ? 'বার্তা পাঠান' : 'Send Message')}
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
