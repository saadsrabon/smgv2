import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { sendContactEmail, getEmailJsErrorMessage } from '@/lib/emailjs';
import { Reveal, SectionHeader } from '@/components/ui/Reveal';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setIsSubmitting(true);
    setStatus('idle');

    const form = new FormData(formEl);

    try {
      await sendContactEmail({
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        subject: String(form.get('subject') ?? 'Website contact'),
        message: String(form.get('message') ?? ''),
      });
      setStatus('success');
      formEl.reset();
    } catch (error) {
      const detail = getEmailJsErrorMessage(error);
      console.error('Contact form error:', detail, error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-light-bg scroll-mt-20 md:scroll-mt-20">
      <div className="container-custom section-padding">
        <Reveal>
          <SectionHeader
            fontClass={fontClass}
            eyebrow={i18n.language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            title={t('contact.title')}
            description={t('contact.subtitle')}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 max-w-6xl mx-auto">
          <Reveal className="card-editorial p-8 lg:p-10">
              <p className={`text-sm font-semibold text-primary mb-4 ${fontClass}`}>{t('contact.nonprofitNote')}</p>
              <h3 className={`text-xl font-bold text-light-text mb-6 ${fontClass}`}>
                {i18n.language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
              </h3>

              <dl className={`space-y-5 ${fontClass}`}>
                {[
                  { icon: MapPin, label: t('contact.usOfficeTitle'), value: t('contact.usOfficeAddress'), multiline: true },
                  { icon: MapPin, label: t('contact.bangladeshAddressLabel'), value: t('contact.address') },
                  {
                    icon: Mail,
                    label: i18n.language === 'bn' ? 'ইমেইল' : 'Email',
                    value: t('contact.email'),
                    href: `mailto:${t('contact.email')}`,
                  },
                  {
                    icon: Phone,
                    label: t('contact.bangladeshPhoneLabel'),
                    value: t('contact.phone'),
                    href: `tel:${t('contact.phone').replace(/[^\d+]/g, '')}`,
                  },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3 border-b border-light-border pb-5 last:border-0 last:pb-0">
                    <row.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <dt className="font-semibold text-light-text text-sm">{row.label}</dt>
                      <dd className={`text-light-muted mt-1 ${row.multiline ? 'whitespace-pre-line' : ''}`}>
                        {'href' in row && row.href ? (
                          <a href={row.href} className="text-primary hover:underline">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
          </Reveal>

          <Reveal delay="md" className="card-editorial p-8 lg:p-10">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
