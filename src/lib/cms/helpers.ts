import type { CmsImage } from './types';

export function mergeSection<T extends Record<string, unknown>>(
  fallback: T,
  api?: Record<string, unknown> | null
): T {
  if (!api || Object.keys(api).length === 0) return fallback;
  const merged = { ...fallback, ...api } as T;

  if (Array.isArray(api.testimonials)) {
    (merged as Record<string, unknown>).testimonials = api.testimonials;
  } else if ('testimonial' in api) {
    delete (merged as Record<string, unknown>).testimonials;
  }

  if (Array.isArray(api.achievements)) {
    (merged as Record<string, unknown>).achievements = api.achievements;
  }

  if (api.images && Array.isArray(api.images)) {
    (merged as Record<string, unknown>).images = mergeImages(
      (fallback.images as CmsImage[]) || [],
      api.images as CmsImage[]
    );
  }
  return merged;
}

function mergeImages(fallback: CmsImage[], api: CmsImage[]): CmsImage[] {
  const map = new Map(fallback.map((i) => [i.key, i]));
  for (const img of api) {
    if (img.url) map.set(img.key, { ...map.get(img.key), ...img });
  }
  return Array.from(map.values()).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function getImageUrl(
  section: Record<string, unknown> | undefined,
  key: string,
  fallback: string
): string {
  const images = section?.images as CmsImage[] | undefined;
  const found = images?.find((i) => i.key === key);
  return found?.url || fallback;
}

export function getImageUrls(
  section: Record<string, unknown> | undefined,
  fallbacks: string[]
): string[] {
  const images = section?.images as CmsImage[] | undefined;
  return fallbacks.map((fb, i) => {
    const key = images?.[i]?.key;
    if (key) return getImageUrl(section, key, fb);
    return images?.[i]?.url || fb;
  });
}
