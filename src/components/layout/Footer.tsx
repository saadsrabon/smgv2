import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openVolunteerModal } from '@/hooks/useVolunteerModal';
import logo from '../../assets/LOGO-removebg-preview.png';
import footerBg from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  const menuLinks = [
    { href: '/#about', label: t('footer.links.about') },
    { href: '/#programs', label: t('footer.links.programs') },
    { href: '/#impact', label: t('footer.links.impact') },
    { href: '/gallery', label: i18n.language === 'bn' ? 'গ্যালারি' : 'Gallery', route: true },
  ];

  const connectLinks = [
    { href: '/#contact', label: t('footer.links.contact') },
    { href: '/#activities', label: i18n.language === 'bn' ? 'চলমান কার্যক্রম' : 'Ongoing Activities' },
    { action: 'volunteer' as const, label: t('contact.volunteer') },
  ];


  return (
    <footer className="relative mt-16 md:mt-20">
      {/* Overlapping CTA band — volunteer (replaces newsletter pattern) */}
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="footer-cta-band mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-10 text-center">
          <h2 className={`text-2xl md:text-3xl font-bold text-white mb-3 ${fontClass}`}>
            {i18n.language === 'bn' ? 'আমাদের সাথে যোগ দিন' : 'Join Our Community'}
          </h2>
          <p className={`text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed ${fontClass}`}>
            {i18n.language === 'bn'
              ? 'আপনার কমিউনিটির উন্নয়নে অংশগ্রহণ করুন এবং ইতিবাচক পরিবর্তন আনুন।'
              : "Be part of your community's development and bring positive change."}
          </p>
          <Button
            size="lg"
            className={`footer-cta-btn rounded-full px-8 font-semibold ${fontClass}`}
            onClick={openVolunteerModal}
          >
            {t('contact.volunteer')}
            <Users className="ml-2 h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>

      {/* Footer — primary brand + photo underlay */}
      <div className="footer-dark relative -mt-10 md:-mt-12 pt-20 md:pt-24 pb-8 overflow-hidden">
        <img
          src={footerBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          aria-hidden
        />
        <div className="footer-dark-overlay absolute inset-0" aria-hidden />

        <div className="container-custom relative z-10 section-padding !pt-0 !pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4 space-y-4">
              <img src={logo} alt="" className="h-[4.75rem] w-auto drop-shadow-sm" />
              <p className={`text-base font-bold text-white ${fontClass}`}>{t('footer.name')}</p>
              <p className={`text-sm text-white/75 leading-relaxed max-w-sm ${fontClass}`}>{t('footer.description')}</p>
              <p className="text-sm text-white/60">
                {t('about.official.legalName')}
              </p>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h4 className={`text-base font-bold text-white ${fontClass}`}>
                {i18n.language === 'bn' ? 'মেনু' : 'Menu'}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {menuLinks.map((link) =>
                  link.route ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`text-sm text-white/75 hover:text-white transition-colors ${fontClass}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-sm text-white/75 hover:text-white transition-colors ${fontClass}`}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className={`text-base font-bold text-white ${fontClass}`}>
                {i18n.language === 'bn' ? 'যুক্ত হোন' : 'Connect'}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {connectLinks.map((link) =>
                  link.action === 'volunteer' ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={openVolunteerModal}
                      className={`text-left text-sm text-white/75 hover:text-white transition-colors ${fontClass}`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-sm text-white/75 hover:text-white transition-colors ${fontClass}`}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className={`text-base font-bold text-white ${fontClass}`}>
                {i18n.language === 'bn' ? 'যোগাযোগ' : 'Contact'}
              </h4>
              <ul className={`space-y-3 text-sm text-white/75 ${fontClass}`}>
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 text-white/90 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-semibold text-white/90 text-xs mb-0.5">{t('contact.usOfficeTitle')}</p>
                    <span className="whitespace-pre-line">{t('contact.usOfficeAddress')}</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 text-white/90 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-semibold text-white/90 text-xs mb-0.5">{t('contact.bangladeshAddressLabel')}</p>
                    <span>{t('contact.address')}</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Mail className="w-4 h-4 text-white/90 shrink-0 mt-0.5" aria-hidden />
                  <a href={`mailto:${t('contact.email')}`} className="hover:text-white">
                    {t('contact.email')}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Phone className="w-4 h-4 text-white/90 shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-semibold text-white/90 text-xs mb-0.5">{t('contact.bangladeshPhoneLabel')}</p>
                    <span>{t('contact.phone')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-white/55">
            <p className={fontClass}>{t('footer.copyright')}</p>
            <p className={fontClass}>{i18n.language === 'bn' ? 'কমিউনিটির জন্য তৈরি' : 'Built for community impact'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
