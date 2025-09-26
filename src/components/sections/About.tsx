import { useTranslation } from 'react-i18next';
import { Target, Eye, CheckCircle, Play } from 'lucide-react';
import { useState } from 'react';

const About = () => {
  const { t, i18n } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Video URLs based on language - using YouTube embed format
  const videoUrl = i18n.language === 'bn' 
    ? 'https://www.youtube.com/embed/DWB6Bzk9IuQ?autoplay=1&rel=0&modestbranding=1'
    : 'https://www.youtube.com/embed/ToLHHAl9KVk?autoplay=1&rel=0&modestbranding=1';

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="about" className="bg-light-surface">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('about.title')}
          </h2>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary-teal/20">
              {!isVideoPlaying ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Video Poster Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=450&fit=crop&crop=center" 
                    alt="Shomajgori Foundation Video Poster"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Video Thumbnail/Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary-teal/30"></div>
                  
                  {/* Play Button with Ripple Effect */}
                  <button
                    onClick={handlePlayVideo}
                    className="relative z-10 group"
                  >
                    <div className="relative">
                      {/* Ripple Effect Container */}
                      <div className="absolute inset-0 rounded-full bg-primary/30 video-ripple"></div>
                      <div className="absolute inset-2 rounded-full bg-primary/20 animate-pulse"></div>
                      
                      {/* Main Play Button */}
                      <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl video-play-button">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </button>
                  
                  {/* Video Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className={`text-white text-xl font-bold mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {i18n.language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
                    </h3>
                    <p className={`text-white/90 text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {i18n.language === 'bn' 
                        ? 'সমাজ গড়ি ফাউন্ডেশনের কাজের গল্প দেখুন' 
                        : 'Watch the story of Shomajgori Foundation\'s work'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={i18n.language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
                  poster="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=450&fit=crop&crop=center"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className={`text-2xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('about.mission.title')}</h3>
            </div>
            <p className={`text-lg text-light-muted leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {t('about.mission.description')}
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-secondary-teal/20 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary-teal" />
              </div>
              <h3 className={`text-2xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{t('about.vision.title')}</h3>
            </div>
            <p className={`text-lg text-light-muted leading-relaxed ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {t('about.vision.description')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className={`text-2xl font-bold text-light-text mb-8 text-center ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('about.values.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(t('about.values.items', { returnObjects: true }) as Array<{title: string, description: string}>).map((value, index: number) => (
              <div key={index} className="bg-light-bg rounded-xl p-6 text-center shadow-lg border border-light-border">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className={`text-lg font-semibold text-light-text mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{value.title}</h4>
                <p className={`text-light-muted text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary-teal/10 rounded-2xl p-8">
          <h3 className={`text-2xl font-bold text-light-text mb-8 text-center ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {t('about.impact.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(t('about.impact.stats', { returnObjects: true }) as Array<{number: string, label: string}>).map((stat, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className={`text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
