import { API_BASE, type HomepageResponse, type GalleryCategory, type GalleryItem } from './types';
import { getFallbackResponse } from './homepageFallback';

export async function fetchHomepage(locale: 'en' | 'bn'): Promise<HomepageResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/homepage?locale=${locale}`);
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    if (!data?.sections) throw new Error('Empty');
    return data;
  } catch {
    return getFallbackResponse(locale);
  }
}

export async function fetchGalleryCategories(): Promise<GalleryCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/gallery/categories`);
    if (!res.ok) throw new Error('Failed');
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchGalleryItems(category?: string): Promise<GalleryItem[]> {
  try {
    const q = category && category !== 'all' ? `?category=${category}` : '';
    const res = await fetch(`${API_BASE}/api/v1/public/gallery${q}`);
    if (!res.ok) throw new Error('Failed');
    const items = await res.json();
    if (!items?.length) throw new Error('Empty');
    return items;
  } catch {
    return [];
  }
}
