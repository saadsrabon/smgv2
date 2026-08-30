import type { CmsImage } from '../types';

export type PhotosSectionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewGalleryText: string;
  viewGalleryLink: string;
  images: CmsImage[];
};

export const photosSectionFallbackEn: PhotosSectionContent = {
  eyebrow: 'In the field',
  title: 'Our Programs in Pictures',
  subtitle: 'Glimpses of our community development programs in Vogdaburi',
  viewGalleryText: 'View Full Gallery',
  viewGalleryLink: '/gallery',
  images: [],
};

export const photosSectionFallbackBn: PhotosSectionContent = {
  eyebrow: 'গ্যালারি',
  title: 'আমাদের কার্যক্রমের ছবি',
  subtitle: 'ভোগডাবুরিতে আমাদের কমিউনিটি উন্নয়ন কার্যক্রমের কিছু মুহূর্ত',
  viewGalleryText: 'সম্পূর্ণ গ্যালারি দেখুন',
  viewGalleryLink: '/gallery',
  images: [],
};
