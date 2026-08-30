import en from '@/locales/en.json';
import bn from '@/locales/bn.json';

import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';
import tailorImg from '@/assets/hero/tailorMachin-CgXAI2ci.png';

import type { HomepageSections } from './types';
import {
  impactSectionFallbackBn,
  impactSectionFallbackEn,
  type ImpactSectionContent,
} from './sections/impact';

const heroSlideFallbacks = [educationImg, photo1, photo2, tailorImg];
const programImages = { education: educationImg, health: photo2, social: photo1, economic: tailorImg };

function heroSection(locale: 'en' | 'bn') {
  const h = locale === 'bn' ? bn.hero : en.hero;
  const slideLabels = locale === 'bn'
    ? ['শিক্ষা', 'কমিউনিটি', 'সম্পৃক্ততা', 'অর্থনৈতিক']
    : ['Education', 'Community', 'Engagement', 'Economic'];
  const statsLabels = locale === 'bn' ? ['পরিবার', 'কার্যক্রম', 'প্রভাব'] : ['Families', 'Programs', 'Lives touched'];
  return {
    title: h.title,
    subtitle: h.subtitle,
    description: h.description,
    ctaText: h.cta,
    ctaLink: '#about',
    donateText: h.donate,
    donateLink: '#contact',
    stats: [
      { value: '500+', label: statsLabels[0] },
      { value: '50+', label: statsLabels[1] },
      { value: '1000+', label: statsLabels[2] },
    ],
    slideLabels,
    images: heroSlideFallbacks.map((url, i) => ({ key: `slide-${i}`, url, sortOrder: i })),
  };
}

function aboutSection(locale: 'en' | 'bn') {
  const a = locale === 'bn' ? bn.about : en.about;
  return {
    title: a.title,
    eyebrow: locale === 'bn' ? 'আমাদের পরিচয়' : 'Who we are',
    statement: a.official.statement,
    purpose: a.official.purpose,
    legalNameLabel: a.official.legalNameLabel,
    legalName: a.official.legalName,
    domainLabel: a.official.domainLabel,
    domain: a.official.domain,
    emailLabel: a.official.emailLabel,
    email: a.official.email,
    videoUrl: locale === 'bn'
      ? 'https://www.youtube.com/embed/DWB6Bzk9IuQ?autoplay=1&rel=0&modestbranding=1'
      : 'https://www.youtube.com/embed/ToLHHAl9KVk?autoplay=1&rel=0&modestbranding=1',
    images: [{ key: 'video-preview', url: '/about-video-preview.png', sortOrder: 0 }],
  };
}

function programsSection(locale: 'en' | 'bn') {
  const p = locale === 'bn' ? bn.programs : en.programs;
  const keys = ['education', 'health', 'social', 'economic'] as const;
  return {
    title: p.title,
    subtitle: p.subtitle,
    eyebrow: locale === 'bn' ? 'আমরা যা করি' : 'What we do',
    tagline: locale === 'bn' ? 'কমিউনিটি রূপান্তরের চারটি স্তম্ভ' : 'Four pillars of community transformation',
    programs: keys.map((key) => ({
      key,
      title: p[key].title,
      description: p[key].description,
      features: p[key].features,
      link: '#programs',
    })),
    images: keys.map((key, i) => ({ key, url: programImages[key], sortOrder: i })),
  };
}

function impactSection(locale: 'en' | 'bn'): ImpactSectionContent {
  const base = locale === 'bn' ? impactSectionFallbackBn : impactSectionFallbackEn;
  return {
    ...base,
    images: [{ key: 'featured-story', url: photo2, sortOrder: 0 }],
  };
}

function photosSection(locale: 'en' | 'bn') {
  const p = locale === 'bn' ? bn.photos : en.photos;
  const items = (p.items as { title: string; category: string }[]) ?? [];
  return {
    title: p.title,
    subtitle: p.subtitle,
    eyebrow: p.eyebrow,
    viewGalleryText: p.viewGallery,
    viewGalleryLink: '/gallery',
    items,
    images: [educationImg, photo1, photo2, tailorImg].map((url, i) => ({ key: `photo-${i}`, url, sortOrder: i })),
  };
}

function activitiesSection(locale: 'en' | 'bn') {
  const a = locale === 'bn' ? bn.activities : en.activities;
  const activityImages = [educationImg, educationImg, photo1, photo2];
  const acts = a.items.map((item, i) => ({
    ...item,
    link: '#activities',
    image: activityImages[i],
  }));
  return {
    eyebrow: a.eyebrow,
    title: a.title,
    subtitle: a.subtitle,
    activities: acts.map(({ image, ...rest }) => rest),
    images: acts.map((act, i) => ({ key: `activity-${i}`, url: act.image, sortOrder: i })),
  };
}

function contactSection(locale: 'en' | 'bn') {
  const c = locale === 'bn' ? bn.contact : en.contact;
  return {
    title: c.title,
    subtitle: c.subtitle,
    nonprofitNote: c.nonprofitNote,
    usOfficeTitle: c.usOfficeTitle,
    usOfficeAddress: c.usOfficeAddress,
    bangladeshAddressLabel: c.bangladeshAddressLabel,
    bangladeshPhoneLabel: c.bangladeshPhoneLabel,
    address: c.address,
    email: c.email,
    phone: c.phone,
    cta: c.cta,
    volunteer: c.volunteer,
    volunteerLink: '#contact',
    formSuccess: c.formSuccess,
    formError: c.formError,
  };
}

function footerSection(locale: 'en' | 'bn') {
  const f = locale === 'bn' ? bn.footer : en.footer;
  return {
    name: f.name,
    description: f.description,
    links: [
      { label: f.links.about, href: '#about' },
      { label: f.links.programs, href: '#programs' },
      { label: f.links.impact, href: '#impact' },
      { label: f.links.contact, href: '#contact' },
    ],
    copyright: f.copyright,
  };
}

function founderModalSection(locale: 'en' | 'bn') {
  const m = locale === 'bn' ? bn.modal : en.modal;
  return {
    title: m.title,
    content: m.content,
    signature: m.signature,
    closeButtonText: m.close,
  };
}

function buildLocale(locale: 'en' | 'bn'): HomepageSections {
  return {
    hero: heroSection(locale),
    about: aboutSection(locale),
    programs: programsSection(locale),
    impact: impactSection(locale),
    photos: photosSection(locale),
    activities: activitiesSection(locale),
    contact: contactSection(locale),
    footer: footerSection(locale),
    founder_modal: founderModalSection(locale),
  };
}

export const homepageFallback = {
  en: buildLocale('en'),
  bn: buildLocale('bn'),
};

export function getFallbackResponse(locale: 'en' | 'bn') {
  return { locale, sections: homepageFallback[locale] };
}
