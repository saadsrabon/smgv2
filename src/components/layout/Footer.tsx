import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-light-surface border-t border-light-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Foundation Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <h3 className={`text-xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('footer.description')}
              </h3>
            </div>
            <p className={`text-light-muted text-sm leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>Quick Links</h4>
            <nav className="space-y-2">
              <a href="#about" className={`block text-light-muted hover:text-primary transition-colors ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('footer.links.about')}
              </a>
              <a href="#programs" className={`block text-light-muted hover:text-primary transition-colors ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('footer.links.programs')}
              </a>
              <a href="#impact" className={`block text-light-muted hover:text-primary transition-colors ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('footer.links.impact')}
              </a>
              <a href="#contact" className={`block text-light-muted hover:text-primary transition-colors ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('footer.links.contact')}
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('contact.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('contact.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('contact.phone')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {t('footer.copyright')}
            </p>
            <div className={`flex items-center space-x-2 text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
