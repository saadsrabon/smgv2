import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description?: string;
}

export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionMeta?.getAttribute('content') ?? '';

    if (description && descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (description && descriptionMeta) {
        descriptionMeta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
