import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import local images
import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  src: string;
  videoUrl?: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

const Gallery = () => {
  const { i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'photo',
      src: educationImg,
      title: i18n.language === 'bn' ? 'শিক্ষা কার্যক্রম' : 'Education Program',
      description: i18n.language === 'bn' ? 'প্রিস্কুল শিক্ষা কার্যক্রমের একটি মুহূর্ত' : 'A moment from our preschool education program',
      category: i18n.language === 'bn' ? 'শিক্ষা' : 'education',
      date: '2024-10-15'
    },
    {
      id: 2,
      type: 'photo',
      src: photo1,
      title: i18n.language === 'bn' ? 'সম্প্রদায় উন্নয়ন' : 'Community Development',
      description: i18n.language === 'bn' ? 'কমিউনিটি সদস্যদের সাথে আলোচনা' : 'Discussion with community members',
      category: i18n.language === 'bn' ? 'সামাজিক' : 'social',
      date: '2024-06-09'
    },
    {
      id: 3,
      type: 'photo',
      src: photo2,
      title: i18n.language === 'bn' ? 'সামাজিক কার্যক্রম' : 'Social Activities',
      description: i18n.language === 'bn' ? 'সামাজিক সম্পৃক্ততা কার্যক্রম' : 'Social engagement activities',
      category: i18n.language === 'bn' ? 'সামাজিক' : 'social',
      date: '2024-10-01'
    },
    {
      id: 4,
      type: 'photo',
      src: tailorImg,
      title: i18n.language === 'bn' ? 'দক্ষতা উন্নয়ন' : 'Skills Development',
      description: i18n.language === 'bn' ? 'সেলাই প্রশিক্ষণ কার্যক্রম' : 'Tailoring training program',
      category: i18n.language === 'bn' ? 'অর্থনৈতিক' : 'economic',
      date: '2024-09-20'
    },
    {
      id: 5,
      type: 'video',
      src: educationImg, // Thumbnail
      videoUrl: 'https://www.youtube.com/embed/DWB6Bzk9IuQ',
      title: i18n.language === 'bn' ? 'কমিউনিটি সেন্টার উদ্বোধন' : 'Community Center Inauguration',
      description: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টারের উদ্বোধনী অনুষ্ঠান' : 'Vogdaburi Community Center inauguration ceremony',
      category: i18n.language === 'bn' ? 'সামাজিক' : 'social',
      date: '2025-02-01'
    },
    {
      id: 6,
      type: 'photo',
      src: photo1,
      title: i18n.language === 'bn' ? 'স্বাস্থ্য ক্যাম্প' : 'Health Camp',
      description: i18n.language === 'bn' ? 'মাসিক স্বাস্থ্য পরীক্ষা কার্যক্রম' : 'Monthly health checkup program',
      category: i18n.language === 'bn' ? 'স্বাস্থ্য' : 'health',
      date: '2024-11-05'
    },
  ];

  const categories = [
    { id: 'all', label: i18n.language === 'bn' ? 'সব' : 'All' },
    { id: 'education', label: i18n.language === 'bn' ? 'শিক্ষা' : 'Education' },
    { id: 'health', label: i18n.language === 'bn' ? 'স্বাস্থ্য' : 'Health' },
    { id: 'social', label: i18n.language === 'bn' ? 'সামাজিক' : 'Social' },
    { id: 'economic', label: i18n.language === 'bn' ? 'অর্থনৈতিক' : 'Economic' },
  ];

  const filteredMedia = selectedCategory === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.category === selectedCategory || item.category === categories.find(c => c.id === selectedCategory)?.label);

  const openLightbox = (media: MediaItem, index: number) => {
    setSelectedMedia(media);
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (selectedIndex + 1) % filteredMedia.length;
    setSelectedIndex(nextIndex);
    setSelectedMedia(filteredMedia[nextIndex]);
  };

  const prevMedia = () => {
    const prevIndex = (selectedIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setSelectedIndex(prevIndex);
    setSelectedMedia(filteredMedia[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-light-bg pt-24">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold text-light-text mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' ? 'ফটো ও ভিডিও গ্যালারি' : 'Photo & Video Gallery'}
          </h1>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn'
              ? 'আমাদের কমিউনিটি উন্নয়ন কার্যক্রমের ছবি এবং ভিডিও'
              : 'Photos and videos from our community development programs'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'} ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-light-surface text-light-text hover:bg-light-border'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredMedia.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative overflow-hidden rounded-xl bg-light-surface shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(item, index)}
            >
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Media Type Badge */}
                <div className="absolute top-3 right-3">
                  {item.type === 'video' ? (
                    <div className="bg-black/70 text-white p-2 rounded-full">
                      <Video className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="bg-black/70 text-white p-2 rounded-full">
                      <Image className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`text-white font-bold text-lg mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-gray-200 text-sm ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-light-muted text-lg ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'এই ক্যাটাগরিতে কোন মিডিয়া নেই' : 'No media found in this category'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevMedia}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button
            onClick={nextMedia}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Content */}
          <div className="max-w-5xl w-full">
            {selectedMedia.type === 'video' ? (
              <div className="aspect-video">
                <iframe
                  src={selectedMedia.videoUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={selectedMedia.title}
                />
              </div>
            ) : (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
            <div className="mt-4 text-center">
              <h3 className={`text-white text-2xl font-bold mb-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {selectedMedia.title}
              </h3>
              <p className={`text-gray-300 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {selectedMedia.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;



