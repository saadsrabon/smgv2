import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { useGalleryCategoriesWithLabels, useGalleryItems } from '@/lib/cms/useGallery';

interface MediaItem {
  id: string | number;
  type: 'photo' | 'video';
  src: string;
  videoUrl?: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  bentoClass: string;
}

const Gallery = () => {
  const { i18n } = useTranslation();
  useDocumentMeta({
    title: i18n.language === 'bn'
      ? 'গ্যালারি | Shomajgori Foundation'
      : 'Gallery | Shomajgori Foundation',
    description: i18n.language === 'bn'
      ? 'সমাজ গড়ি ফাউন্ডেশনের শিক্ষা, সামাজিক ও কমিউনিটি উন্নয়ন কার্যক্রমের ছবি ও ভিডিও।'
      : 'Photos and videos from Shomajgori Foundation education, social, and community development programs.',
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = useGalleryCategoriesWithLabels();
  const { items: rawItems } = useGalleryItems(selectedCategory);

  const mediaItems: MediaItem[] = rawItems.map((item) => ({
    id: item.id,
    type: item.type,
    src: item.src,
    videoUrl: item.videoUrl,
    title: item.title,
    description: item.description,
    category: item.category,
    categoryId: item.categoryId,
    bentoClass: item.bentoClass || '',
  }));

  const filteredMedia =
    selectedCategory === 'all'
      ? mediaItems
      : mediaItems.filter((item) => item.categoryId === selectedCategory);
  const useBentoLayout = selectedCategory === 'all' && filteredMedia.length >= 5;

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
    <div className="min-h-screen bg-light-bg pt-[5.25rem]">
      <div className="container-custom section-padding">
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

        <div
          className={
            useBentoLayout
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:grid-rows-3 lg:h-[min(72vh,640px)]'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]'
          }
        >
          {filteredMedia.map((item, index) => (
            <div
              key={item.id}
              className={`group relative h-full min-h-[200px] overflow-hidden rounded-xl bg-light-surface shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer ${
                useBentoLayout ? item.bentoClass : ''
              } ${useBentoLayout ? '' : 'sm:min-h-[220px]'}`}
              onClick={() => openLightbox(item, index)}
            >
              <div className="relative h-full w-full min-h-[inherit]">
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute top-3 right-3 z-10">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`text-white font-bold text-lg mb-1 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-gray-200 text-sm line-clamp-2 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-light-muted text-lg ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'এই ক্যাটাগরিতে কোন মিডিয়া নেই' : 'No media found in this category'}
            </p>
          </div>
        )}
      </div>

      {lightboxOpen && selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button onClick={prevMedia} className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10">
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button onClick={nextMedia} className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10">
            <ChevronRight className="w-12 h-12" />
          </button>
          <div className="max-w-5xl w-full">
            {selectedMedia.type === 'video' ? (
              <div className="aspect-video">
                <iframe src={selectedMedia.videoUrl} className="w-full h-full rounded-lg" allowFullScreen title={selectedMedia.title} />
              </div>
            ) : (
              <img src={selectedMedia.src} alt={selectedMedia.title} className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
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
