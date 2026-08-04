import { useTranslation } from 'react-i18next';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

import educationImg from '@/assets/hero/education-B1rO235h.jpeg';
import photo1 from '@/assets/hero/PHOTO-2024-06-09-10-22-25.jpg';
import photo2 from '@/assets/hero/PHOTO-2024-10-01-08-46-54.jpg';

const categoryStyles: Record<string, { badge: string; bar: string }> = {
  Education: { badge: 'bg-primary/10 text-primary', bar: 'bg-primary' },
  Digital: { badge: 'bg-secondary-teal/10 text-secondary-teal', bar: 'bg-secondary-teal' },
  Health: { badge: 'bg-secondary-orange/10 text-secondary-orange', bar: 'bg-secondary-orange' },
  শিক্ষা: { badge: 'bg-primary/10 text-primary', bar: 'bg-primary' },
  ডিজিটাল: { badge: 'bg-secondary-teal/10 text-secondary-teal', bar: 'bg-secondary-teal' },
  স্বাস্থ্য: { badge: 'bg-secondary-orange/10 text-secondary-orange', bar: 'bg-secondary-orange' },
};

const OngoingActivities = () => {
  const { i18n } = useTranslation();
  const fontClass = i18n.language === 'bn' ? 'font-bengali' : 'font-english';

  const activities = [
    {
      id: 1,
      image: educationImg,
      title: i18n.language === 'bn' ? 'প্রিস্কুল শিক্ষা কার্যক্রম' : 'Preschool Education Program',
      description: i18n.language === 'bn'
        ? 'প্রতিদিন ৭৩ জন শিশুকে মানসম্মত প্রাথমিক শিক্ষা প্রদান করা হচ্ছে'
        : '73 children receive quality early education daily',
      location: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টার' : 'Vogdaburi Community Center',
      schedule: i18n.language === 'bn' ? 'রবিবার - বৃহঃস্পতিবার, সকাল ৮টা - সকাল ১০টা' : 'Sunday - Wednesday, 8:00 AM - 10:00 AM',
      participants: 73,
      category: i18n.language === 'bn' ? 'শিক্ষা' : 'Education',
    },
    {
      id: 2,
      image: educationImg,
      title: i18n.language === 'bn' ? 'টিউটরিং প্রোগ্রাম' : 'Tutoring Program',
      description: i18n.language === 'bn'
        ? 'শিক্ষার্থীদের একাডেমিক উন্নতির জন্য বিশেষ সহায়তা প্রদান'
        : 'Specialized academic support for student improvement',
      location: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টার' : 'Vogdaburi Community Center',
      schedule: i18n.language === 'bn' ? 'শনিবার - বৃহঃস্পতিবার, বিকাল ৪টা - সন্ধ্যা ৬টা' : 'Saturday - Wednesday, 4:00 PM - 6:00 PM',
      participants: 57,
      category: i18n.language === 'bn' ? 'শিক্ষা' : 'Education',
    },
    {
      id: 3,
      image: photo1,
      title: i18n.language === 'bn' ? 'ডিজিটাল সাক্ষরতা প্রশিক্ষণ' : 'Digital Literacy Training',
      description: i18n.language === 'bn'
        ? 'যুবকদের জন্য কম্পিউটার এবং ইন্টারনেট ব্যবহার প্রশিক্ষণ'
        : 'Computer and internet skills training for youth',
      location: i18n.language === 'bn' ? 'কম্পিউটার ল্যাব, ভোগদাবুরি' : 'Computer Lab, Vogdaburi',
      schedule: i18n.language === 'bn' ? 'শনি - বৃহস্পতিবার, সকাল ১০টা - বিকাল ৫টা' : 'Saturday - Thursday, 10:00 AM - 5:00 PM',
      participants: 25,
      category: i18n.language === 'bn' ? 'ডিজিটাল' : 'Digital',
    },
    {
      id: 4,
      image: photo2,
      title: i18n.language === 'bn' ? 'কমিউনিটি স্বাস্থ্য ক্যাম্প' : 'Community Health Camp',
      description: i18n.language === 'bn'
        ? 'মাসিক স্বাস্থ্য পরীক্ষা এবং সচেতনতা কার্যক্রম'
        : 'Monthly health checkups and awareness programs',
      location: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টার' : 'Vogdaburi Community Center',
      schedule: i18n.language === 'bn'
        ? 'প্রতিমাসের ২য়, ৩য় ও ৪র্থ সপ্তাহের প্রতি রবিবার, সকাল ৯টা – দুপুর ১২:৩০'
        : 'Every 2nd, 3rd, and 4th Sunday of each month, 9:00 AM – 12:30 PM',
      participants: 150,
      category: i18n.language === 'bn' ? 'স্বাস্থ্য' : 'Health',
    },
  ];

  return (
    <section id="activities" className="relative scroll-mt-20 overflow-hidden bg-light-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(47,170,160,0.06)_0%,transparent_42%)]"
        aria-hidden
      />

      <div className="container-custom relative section-padding !py-10 md:!py-12">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <p className={`section-eyebrow text-base ${fontClass}`}>
              {i18n.language === 'bn' ? 'এখন চলছে' : 'Running now'}
            </p>
            <h2 className={`section-title mb-3 ${fontClass}`}>
              {i18n.language === 'bn' ? 'চলমান কার্যক্রম' : 'Ongoing Activities'}
            </h2>
            <p className={`section-lead max-w-xl ${fontClass}`}>
              {i18n.language === 'bn'
                ? 'ভোগদাবুরিতে বর্তমানে চলমান কমিউনিটি উন্নয়ন কার্যক্রম'
                : 'Community development programs currently running in Vogdaburi'}
            </p>
          </div>
          <p className={`text-lg font-semibold text-primary ${fontClass}`}>
            {activities.length} {i18n.language === 'bn' ? 'টি কার্যক্রম' : 'active programs'}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {activities.map((activity, index) => {
            const styles = categoryStyles[activity.category] ?? {
              badge: 'bg-light-surface text-light-muted',
              bar: 'bg-primary',
            };

            return (
              <Reveal key={activity.id} delay={index % 2 === 1 ? 'sm' : 'none'}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light-border bg-light-surface shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <img
                      src={activity.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-light-text/50 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${fontClass} ${styles.badge}`}
                      >
                        {activity.category}
                      </span>
                      <div className={`text-right text-white ${fontClass}`}>
                        <div className="text-3xl font-bold leading-none tabular-nums">{activity.participants}+</div>
                        <div className="text-xs opacity-90">
                          {i18n.language === 'bn' ? 'অংশগ্রহণকারী' : 'participants'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className={`mb-3 h-1 w-12 rounded-full ${styles.bar}`} aria-hidden />

                    <h3 className={`text-xl md:text-2xl font-bold text-light-text mb-2 leading-snug ${fontClass}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-base md:text-lg text-light-muted leading-relaxed mb-5 flex-1 ${fontClass}`}>
                      {activity.description}
                    </p>

                    <ul className={`space-y-2.5 text-base text-light-muted ${fontClass}`}>
                      <li className="flex gap-2.5">
                        <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                        <span>{activity.location}</span>
                      </li>
                      <li className="flex gap-2.5">
                        <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden />
                        <span>{activity.schedule}</span>
                      </li>
                    </ul>

                    <div className="mt-5 flex items-center justify-between border-t border-light-border pt-4">
                      <span className={`inline-flex items-center gap-2 text-base font-semibold text-primary ${fontClass}`}>
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden />
                        {i18n.language === 'bn' ? 'চলমান' : 'Active now'}
                      </span>
                      <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OngoingActivities;
