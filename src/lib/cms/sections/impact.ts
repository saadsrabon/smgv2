import type { CmsImage } from '../types';

export type ImpactTestimonialContent = {
  quote: string;
  author: string;
  role?: string;
};

/** CMS shape for homepage impact section (stat labels/values are not stored here). */
export type ImpactSectionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  storyTitle: string;
  storyDescription: string;
  storyBody: string;
  achievementsHeading: string;
  achievements: string[];
  testimonials: ImpactTestimonialContent[];
  images: CmsImage[];
};

export const impactSectionFallbackEn: ImpactSectionContent = {
  eyebrow: 'Impact',
  title: 'Impact Stories',
  subtitle: 'Real stories of transformation and community empowerment',
  storyTitle: 'Vogdaburi Community Center',
  storyDescription: 'A beacon of hope and transformation in the heart of our community',
  storyBody:
    "The Vogdaburi Community Center stands as a testament to what's possible when a community comes together. Through our comprehensive programs, we've created a space where families can access education, healthcare, and social support all under one roof.",
  achievementsHeading: 'Key achievements',
  achievements: [
    'Established a fully functional community center',
    'Provided digital literacy training to 200+ residents',
    'Created a safe space for children and families',
    'Facilitated community-led initiatives and programs',
  ],
  testimonials: [
    {
      quote:
        'This center has transformed our village. Our children have access to education and our community has a place to gather and grow together.',
      author: 'Community Member, Vogdaburi',
      role: 'Community voice',
    },
    {
      quote:
        'Through Shomajgori Foundation, our community has truly transformed. Now our children are getting quality education and we are all working together.',
      author: 'Vogdaburi Community Member',
      role: 'Success story',
    },
    {
      quote:
        'The programs here gave our youth confidence and new skills. We see hope in every family that walks through these doors.',
      author: 'Local Program Volunteer',
      role: 'Community partner',
    },
  ],
  images: [{ key: 'featured-story', url: '', sortOrder: 0 }],
};

export const impactSectionFallbackBn: ImpactSectionContent = {
  eyebrow: 'প্রভাব',
  title: 'প্রভাবের গল্প',
  subtitle: 'রূপান্তর এবং কমিউনিটি ক্ষমতায়নের বাস্তব গল্প',
  storyTitle: 'ভগদাবুরি কমিউনিটি সেন্টার',
  storyDescription: 'আমাদের কমিউনিটির হৃদয়ে আশা এবং রূপান্তরের আলোকবর্তিকা',
  storyBody:
    'ভগদাবুরি কমিউনিটি সেন্টার একটি প্রমাণ যে যখন একটি কমিউনিটি একসাথে আসে তখন কী সম্ভব। আমাদের ব্যাপক প্রোগ্রামের মাধ্যমে, আমরা এমন একটি স্থান তৈরি করেছি যেখানে পরিবারগুলি একটি ছাদের নিচে শিক্ষা, স্বাস্থ্যসেবা এবং সামাজিক সহায়তা পেতে পারে।',
  achievementsHeading: 'প্রধান অর্জন',
  achievements: [
    'একটি সম্পূর্ণ কার্যকর কমিউনিটি সেন্টার প্রতিষ্ঠা',
    '২০০+ বাসিন্দাকে ডিজিটাল সাক্ষরতা প্রশিক্ষণ প্রদান',
    'শিশু এবং পরিবারের জন্য একটি নিরাপদ স্থান তৈরি',
    'কমিউনিটি-নেতৃত্বাধীন উদ্যোগ এবং প্রোগ্রাম সহায়তা',
  ],
  testimonials: [
    {
      quote: 'এই সেন্টার আমাদের গ্রামকে রূপান্তরিত করেছে।',
      author: 'কমিউনিটি সদস্য, ভোগদাবুরি',
      role: 'সফলতার গল্প',
    },
    {
      quote:
        'সমাজ গড়ি ফাউন্ডেশনের মাধ্যমে আমাদের কমিউনিটি সত্যিই পরিবর্তিত হয়েছে। এখন আমাদের সন্তানরা ভালো শিক্ষা পাচ্ছে এবং আমরা সবাই একসাথে কাজ করছি।',
      author: 'ভগদাবুরি কমিউনিটি সদস্য',
      role: 'কমিউনিটির কণ্ঠ',
    },
    {
      quote: 'এখানের কার্যক্রম আমাদের যুব সমাজকে আত্মবিশ্বাসী করেছে। প্রতিটি পরিবারে আশার আলো দেখছি।',
      author: 'স্থানীয় স্বেচ্ছাসেবক',
      role: 'সমর্থক',
    },
  ],
  images: [{ key: 'featured-story', url: '', sortOrder: 0 }],
};

export function resolveImpactTestimonials(section: Record<string, unknown>): ImpactTestimonialContent[] {
  if (Array.isArray(section.testimonials)) {
    return (section.testimonials as ImpactTestimonialContent[]).filter((item) =>
      String(item.quote ?? '').trim()
    );
  }

  const legacy = section.testimonial;
  if (legacy && typeof legacy === 'object') {
    const item = legacy as ImpactTestimonialContent;
    return String(item.quote ?? '').trim() ? [item] : [];
  }

  return [];
}
