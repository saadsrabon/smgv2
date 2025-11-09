import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Heart, UserPlus } from 'lucide-react';
import VolunteerModal from '@/components/ui/VolunteerModal';
import logo from '@/assets/LOGO-removebg-preview.png';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navigation = [
    { name: t('nav.home'), href: '/#home', type: 'link' },
    { name: t('nav.about'), href: '/#about', type: 'link' },
    { name: t('nav.programs'), href: '/#programs', type: 'link' },
    { name: t('nav.impact'), href: '/#impact', type: 'link' },
    { name: i18n.language === 'bn' ? 'ছবি' : 'Photos', href: '/#photos', type: 'link' },
    { name: i18n.language === 'bn' ? 'গ্যালারি' : 'Gallery', href: '/gallery', type: 'route' },
    { name: i18n.language === 'bn' ? 'বিশ্লেষণ' : 'Analytics', href: '/analytics', type: 'route' },
    { name: t('nav.contact'), href: '/#contact', type: 'link' },
  ];

  return (
    <header className="fixed top-0 w-full bg-light-bg/95 backdrop-blur-sm border-b border-light-border z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-24 h-auto rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="w-full h-full" />
            </div>
            {/* <div className="hidden sm:block">
              <h1 className={`text-xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {i18n.language === 'bn' ? 'সমাজ গড়ি ফাউন্ডেশন' : 'Shomajgori Foundation'}
              </h1>
            </div> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-light-text hover:text-primary transition-colors font-medium relative group ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-light-text hover:text-primary transition-colors font-medium relative group ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}
          </nav>

          {/* Language Toggle & CTA & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 border-light-border hover:bg-primary/10"
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === 'en' ? 'বাংলা' : 'English'}</span>
            </Button>

            {/* Volunteer Button */}
            <Button
              size="sm"
              onClick={() => setIsVolunteerModalOpen(true)}
              className="btn-primary hidden md:flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className={i18n.language === 'bn' ? 'font-bengali' : 'font-english'}>
                {i18n.language === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Join as Volunteer'}
              </span>
            </Button>

            {/* Donate Button */}
            <Button
              size="sm"
              className="btn-primary hidden lg:flex items-center space-x-2"
              onClick={() => alert('Coming soon!')}
            >
              <Heart className="w-4 h-4" />
              <span>{i18n.language === 'bn' ? 'আসছে শীঘ্রই' : 'Coming Soon'}</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-light-border">
            <nav className="py-4 space-y-4">
              {navigation.map((item) => (
                item.type === 'route' ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block text-light-text hover:text-primary transition-colors font-medium py-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block text-light-text hover:text-primary transition-colors font-medium py-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <div className="pt-4 border-t border-light-border space-y-3">
                <Button
                  onClick={() => {
                    setIsVolunteerModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className={i18n.language === 'bn' ? 'font-bengali' : 'font-english'}>
                    {i18n.language === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Join as Volunteer'}
                  </span>
                </Button>
                <Button
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                  onClick={() => alert('Coming soon!')}
                >
                  <Heart className="w-4 h-4" />
                  <span>{i18n.language === 'bn' ? 'আসছে শীঘ্রই' : 'Coming Soon'}</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Volunteer Modal */}
      <VolunteerModal 
        isOpen={isVolunteerModalOpen} 
        onClose={() => setIsVolunteerModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
