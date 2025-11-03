import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import local images
import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

const Photos = () => {
  const { i18n } = useTranslation();

  const photos = [
    {
      id: 1,
      src: educationImg,
      title: i18n.language === 'bn' ? 'শিক্ষা কার্যক্রম' : 'Education Program',
      category: i18n.language === 'bn' ? 'শিক্ষা' : 'Education'
    },
    {
      id: 2,
      src: photo1,
      title: i18n.language === 'bn' ? 'সম্প্রদায় উন্নয়ন' : 'Community Development',
      category: i18n.language === 'bn' ? 'সামাজিক' : 'Social'
    },
    {
      id: 3,
      src: photo2,
      title: i18n.language === 'bn' ? 'সামাজিক কার্যক্রম' : 'Social Activities',
      category: i18n.language === 'bn' ? 'সামাজিক' : 'Social'
    },
    {
      id: 4,
      src: tailorImg,
      title: i18n.language === 'bn' ? 'দক্ষতা উন্নয়ন' : 'Skills Development',
      category: i18n.language === 'bn' ? 'অর্থনৈতিক' : 'Economic'
    },
  ];

  return (
    <section id="photos" className="bg-light-surface">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-primary mr-3" />
            <h2 className={`text-3xl md:text-4xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'আমাদের কার্যক্রমের ছবি' : 'Our Programs in Pictures'}
            </h2>
          </div>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' 
              ? 'ভোগদাবুরিতে আমাদের সম্প্রদায় উন্নয়ন কার্যক্রমের কিছু মুহূর্ত' 
              : 'Glimpses of our community development programs in Vogdaburi'
            }
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-xl bg-light-bg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className={`inline-block px-3 py-1 bg-primary text-white text-xs rounded-full mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {photo.category}
                  </span>
                  <h3 className={`text-white font-semibold text-lg ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {photo.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" className={`btn-primary ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'সব ছবি দেখুন' : 'View Full Gallery'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Photos;
