import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, BookOpen } from 'lucide-react';

// Import local hero images
import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero images with perfect masonry layout
  const images = [
    {
      id: 1,
      src: educationImg,
      title: i18n.language === 'bn' ? 'শিক্ষা কার্যক্রম' : 'Education Program',
      description: i18n.language === 'bn' ? 'মানসম্মত শিক্ষার মাধ্যমে ভবিষ্যৎ গড়ে তুলি' : 'Building futures through quality education'
    },
    {
      id: 2,
      src: photo1,
      title: i18n.language === 'bn' ? 'সম্প্রদায় উন্নয়ন' : 'Community Development',
      description: i18n.language === 'bn' ? 'একসাথে কাজ করে সমৃদ্ধি আনি' : 'Working together for prosperity'
    },
    {
      id: 3,
      src: photo2,
      title: i18n.language === 'bn' ? 'সামাজিক কার্যক্রম' : 'Social Activities',
      description: i18n.language === 'bn' ? 'সমাজের উন্নয়নে সক্রিয় অংশগ্রহণ' : 'Active participation in social development'
    },
    {
      id: 4,
      src: tailorImg,
      title: i18n.language === 'bn' ? 'দক্ষতা উন্নয়ন' : 'Skill Development',
      description: i18n.language === 'bn' ? 'পেশাগত দক্ষতা বৃদ্ধির মাধ্যমে আত্মনির্ভরশীলতা' : 'Building self-reliance through skill development'
    }
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeroCta = () => {
    scrollToSection('about');
    setTimeout(() => {
      window.dispatchEvent(new Event('about:playVideo'));
    }, 600);
  };

  const handleHeroDonate = () => {
    alert(i18n.language === 'bn' ? 'আসছে শীঘ্রই' : 'Coming soon!');
  };

  return (


    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-light-bg via-light-surface to-light-bg relative overflow-hidden scroll-mt-24 md:scroll-mt-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-6xl font-bold text-light-text leading-tight ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {t('hero.title')}
              </h1>
              <p className="text-xl text-primary font-semibold">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-light-muted leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-primary" onClick={handleHeroCta}>
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-secondary"
                onClick={handleHeroDonate}
              >
                {i18n.language === 'bn' ? 'আসছে শীঘ্রই' : 'Coming Soon'}
                <Heart className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-light-text">500+</div>
                <div className="text-sm text-light-muted">Families</div>
              </div>
              <div className="">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-teal/20 rounded-full mb-2">
                  <BookOpen className="w-6 h-6 text-secondary-teal" />
                </div>
                <div className="text-2xl font-bold text-light-text">50+</div>
                <div className="text-sm text-light-muted">Programs</div>
              </div>
              <div className="">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-orange/20 rounded-full mb-2">
                  <Heart className="w-6 h-6 text-secondary-orange" />
                </div>
                <div className="text-2xl font-bold text-light-text">1000+</div>
                <div className="text-sm text-light-muted">Lives</div>
              </div>
            </div>
          </div>

          {/* Perfect Masonry/Bento Grid */}
          <div className="relative">
            <div className="masonry-grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 h-[400px] md:h-[600px] auto-rows-fr">
              {/* Large featured image - spans 2 columns, 2 rows */}
              <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group masonry-item">
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].title}
                  className="masonry-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className={`text-xl font-bold mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {images[currentImageIndex].title}
                  </h3>
                  <p className={`text-sm opacity-90 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {images[currentImageIndex].description}
                  </p>
                </div>
              </div>

              {/* Top right image */}
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-2xl group masonry-item">
                <img
                  src={images[(currentImageIndex + 1) % images.length].src}
                  alt={images[(currentImageIndex + 1) % images.length].title}
                  className="masonry-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className={`text-lg font-semibold ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {images[(currentImageIndex + 1) % images.length].title}
                  </h4>
                </div>
              </div>

              {/* Bottom left image */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group masonry-item">
                <img
                  src={images[(currentImageIndex + 2) % images.length].src}
                  alt={images[(currentImageIndex + 2) % images.length].title}
                  className="masonry-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className={`text-sm font-semibold ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {images[(currentImageIndex + 2) % images.length].title}
                  </h4>
                </div>
              </div>

              {/* Bottom right image */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group masonry-item">
                <img
                  src={images[(currentImageIndex + 3) % images.length].src}
                  alt={images[(currentImageIndex + 3) % images.length].title}
                  className="masonry-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className={`text-sm font-semibold ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {images[(currentImageIndex + 3) % images.length].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Image indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-primary w-8' : 'bg-light-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
