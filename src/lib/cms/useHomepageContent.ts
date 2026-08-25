import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchHomepage } from './api';
import { getFallbackResponse, homepageFallback } from './homepageFallback';
import { mergeSection } from './helpers';
import type { ImpactSectionContent } from './sections/impact';
import { resolveImpactTestimonials } from './sections/impact';

export function useHomepageContent() {
  const { i18n } = useTranslation();
  const locale = (i18n.language === 'bn' ? 'bn' : 'en') as 'en' | 'bn';

  return useQuery({
    queryKey: ['homepage', locale],
    queryFn: () => fetchHomepage(locale),
    placeholderData: getFallbackResponse(locale),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useCmsSection<K extends keyof typeof homepageFallback.en>(sectionKey: K) {
  const { i18n } = useTranslation();
  const locale = (i18n.language === 'bn' ? 'bn' : 'en') as 'en' | 'bn';
  const { data } = useHomepageContent();

  const fallback = homepageFallback[locale][sectionKey] as Record<string, unknown>;
  const apiSection = data?.sections?.[sectionKey] as Record<string, unknown> | undefined;

  return mergeSection(fallback, apiSection);
}

export function useFounderModalContent() {
  return useCmsSection('founder_modal');
}

export function useImpactSection(): ImpactSectionContent {
  const section = useCmsSection('impact') as Record<string, unknown>;
  return {
    ...(section as ImpactSectionContent),
    testimonials: resolveImpactTestimonials(section),
  };
}
