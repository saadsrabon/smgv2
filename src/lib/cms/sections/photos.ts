import type { CmsImage } from '../types';

export type PhotoItemContent = {
  title: string;
  category: string;
};

export type PhotosSectionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewGalleryText: string;
  viewGalleryLink: string;
  items: PhotoItemContent[];
  images: CmsImage[];
};

const defaultItemsEn: PhotoItemContent[] = [
  { title: 'Education Program', category: 'Education' },
  { title: 'Economic Empowerment', category: 'Social' },
  { title: 'Social Activities', category: 'Social' },
  { title: 'Skills Development', category: 'Economic' },
];

const defaultItemsBn: PhotoItemContent[] = [
  { title: 'শিক্ষা কার্যক্রম', category: 'শিক্ষা' },
  { title: 'অর্থনৈতিক ক্ষমতায়ন', category: 'সামাজিক' },
  { title: 'সামাজিক কার্যক্রম', category: 'সামাজিক' },
  { title: 'দক্ষতা উন্নয়ন', category: 'অর্থনৈতিক' },
];

export const photosSectionFallbackEn: PhotosSectionContent = {
  eyebrow: 'In the field',
  title: 'Our Programs in Pictures',
  subtitle: 'Glimpses of our community development programs in Vogdaburi',
  viewGalleryText: 'View Full Gallery',
  viewGalleryLink: '/gallery',
  items: defaultItemsEn,
  images: [],
};

export const photosSectionFallbackBn: PhotosSectionContent = {
  eyebrow: 'গ্যালারি',
  title: 'আমাদের কার্যক্রমের ছবি',
  subtitle: 'ভোগডাবুরিতে আমাদের কমিউনিটি উন্নয়ন কার্যক্রমের কিছু মুহূর্ত',
  viewGalleryText: 'সম্পূর্ণ গ্যালারি দেখুন',
  viewGalleryLink: '/gallery',
  items: defaultItemsBn,
  images: [],
};

export function resolvePhotoItems(section: Record<string, unknown>): PhotoItemContent[] {
  if (Array.isArray(section.items) && section.items.length > 0) {
    return (section.items as PhotoItemContent[]).map((item) => ({
      title: String(item.title ?? ''),
      category: String(item.category ?? ''),
    }));
  }

  const images = section.images;
  if (Array.isArray(images) && images.length > 0) {
    return images.map((img) => {
      const row = img as { alt?: string; category?: string };
      return {
        title: String(row.alt ?? ''),
        category: String(row.category ?? ''),
      };
    });
  }

  return [];
}
