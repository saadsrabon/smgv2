export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export type CmsImage = { key: string; url: string; alt?: string; sortOrder?: number };

export type HomepageSections = Record<string, Record<string, unknown>>;

export type HomepageResponse = {
  locale: string;
  sections: HomepageSections;
};

export type GalleryCategory = {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
};

export type GalleryItem = {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  videoUrl?: string;
  categorySlug: string;
  categoryNameEn: string;
  categoryNameBn: string;
};
