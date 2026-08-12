import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchGalleryCategories, fetchGalleryItems } from './api';
import { galleryFallbackCategories, galleryFallbackItems } from './galleryFallback';

export function useGalleryCategories() {
  return useQuery({
    queryKey: ['gallery-categories'],
    queryFn: fetchGalleryCategories,
    placeholderData: galleryFallbackCategories.filter((c) => c.slug !== 'all'),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useGalleryItems(category: string) {
  const { i18n } = useTranslation();
  const isBn = i18n.language === 'bn';

  const query = useQuery({
    queryKey: ['gallery-items', category],
    queryFn: () => fetchGalleryItems(category),
    placeholderData: category === 'all'
      ? galleryFallbackItems
      : galleryFallbackItems.filter((i) => i.categorySlug === category),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const items = (query.data?.length ? query.data : (
    category === 'all'
      ? galleryFallbackItems
      : galleryFallbackItems.filter((i) => i.categorySlug === category)
  )).map((item) => ({
    ...item,
    title: isBn ? item.titleBn : item.titleEn,
    description: isBn ? item.descriptionBn : item.descriptionEn,
    category: isBn ? item.categoryNameBn : item.categoryNameEn,
    categoryId: item.categorySlug,
    src: item.url,
    bentoClass: 'bentoClass' in item ? (item as { bentoClass: string }).bentoClass : '',
  }));

  return { ...query, items };
}

export function useGalleryCategoriesWithLabels() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === 'bn';
  const { data } = useGalleryCategories();

  const cats = (data?.length ? data : galleryFallbackCategories.filter((c) => c.slug !== 'all')).map((c) => ({
    id: c.slug,
    label: isBn ? c.nameBn : c.nameEn,
  }));

  return [{ id: 'all', label: isBn ? 'সব' : 'All' }, ...cats];
}
