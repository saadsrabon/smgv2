import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, BookOpen, Shield, Lightbulb } from 'lucide-react';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images - you can replace these with actual images
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
      title: 'Community Garden',
      description: 'Empowering communities through sustainable agriculture'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=500&fit=crop',
      title: 'Education Center',
      description: 'Learning and growing together'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
      title: 'Health Camp',
      description: 'Providing essential healthcare services'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
      title: 'Women Empowerment',
      description: 'Building stronger communities together'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      title: 'Youth Development',
      description: 'Investing in the next generation'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=500&fit=crop',
      title: 'Community Events',
      description: 'Celebrating together, growing together'
    }
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (

    
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-light-bg via-light-surface to-light-bg relative overflow-hidden">
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
              <Button size="lg" className="btn-primary">
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary">
                {t('hero.donate')}
                <Heart className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-light-text">500+</div>
                <div className="text-sm text-light-muted">Families</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-teal/20 rounded-full mb-2">
                  <BookOpen className="w-6 h-6 text-secondary-teal" />
                </div>
                <div className="text-2xl font-bold text-light-text">50+</div>
                <div className="text-sm text-light-muted">Programs</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary-orange/20 rounded-full mb-2">
                  <Heart className="w-6 h-6 text-secondary-orange" />
                </div>
                <div className="text-2xl font-bold text-light-text">1000+</div>
                <div className="text-sm text-light-muted">Lives</div>
              </div>
            </div>
          </div>

          {/* Masonry/Bento Grid */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 h-[600px]">
              {/* Large image - top left */}
              <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group">
                <img
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{images[currentImageIndex].title}</h3>
                  <p className="text-sm opacity-90">{images[currentImageIndex].description}</p>
                </div>
              </div>

              {/* Small image - top right */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group">
                <img
                  src={images[(currentImageIndex + 1) % images.length].src}
                  alt={images[(currentImageIndex + 1) % images.length].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm font-semibold">{images[(currentImageIndex + 1) % images.length].title}</h4>
                </div>
              </div>

              {/* Medium image - middle right */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group">
                <img
                  src={images[(currentImageIndex + 2) % images.length].src}
                  alt={images[(currentImageIndex + 2) % images.length].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm font-semibold">{images[(currentImageIndex + 2) % images.length].title}</h4>
                </div>
              </div>

              {/* Small image - bottom left */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group">
                <img
                  src={images[(currentImageIndex + 3) % images.length].src}
                  alt={images[(currentImageIndex + 3) % images.length].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm font-semibold">{images[(currentImageIndex + 3) % images.length].title}</h4>
                </div>
              </div>

              {/* Small image - bottom right */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group">
                <img
                  src={images[(currentImageIndex + 4) % images.length].src}
                  alt={images[(currentImageIndex + 4) % images.length].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="text-sm font-semibold">{images[(currentImageIndex + 4) % images.length].title}</h4>
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
