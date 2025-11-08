import { useTranslation } from 'react-i18next';
import { Activity, Calendar, MapPin, Users, Clock } from 'lucide-react';

const OngoingActivities = () => {
  const { i18n } = useTranslation();

  const activities = [
    {
      id: 1,
      title: i18n.language === 'bn' ? 'প্রিস্কুল শিক্ষা কার্যক্রম' : 'Preschool Education Program',
      description: i18n.language === 'bn' 
        ? 'প্রতিদিন ৭৩ জন শিশুকে মানসম্মত প্রাথমিক শিক্ষা প্রদান করা হচ্ছে'
        : '73 children receive quality early education daily',
      location: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টার' : 'Vogdaburi Community Center',
      schedule: i18n.language === 'bn' ? 'রবিবার - বৃহঃস্পতিবার, সকাল ৮টা - সকাল ১০টা' : 'Sunday - Wednesday, 8:00 AM - 10:00 AM',
      participants: 73,
      category: i18n.language === 'bn' ? 'শিক্ষা' : 'Education',
      color: 'primary'
    },
    {
      id: 2,
      title: i18n.language === 'bn' ? 'টিউটরিং প্রোগ্রাম' : 'Tutoring Program',
      description: i18n.language === 'bn'
        ? 'শিক্ষার্থীদের একাডেমিক উন্নতির জন্য বিশেষ সহায়তা প্রদান'
        : 'Specialized academic support for student improvement',
      location: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টার' : 'Vogdaburi Community Center',
      schedule: i18n.language === 'bn' ? 'শনিবার - বৃহঃস্পতিবার, বিকাল ৪টা - সন্ধ্যা ৬টা' : 'Saturday - Wednesday, 4:00 PM - 06:00 PM',
      participants: 57,
      category: i18n.language === 'bn' ? 'শিক্ষা' : 'Education',
      color: 'secondary-teal'
    },
    {
      id: 3,
      title: i18n.language === 'bn' ? 'ডিজিটাল সাক্ষরতা প্রশিক্ষণ' : 'Digital Literacy Training',
      description: i18n.language === 'bn'
        ? 'যুবকদের জন্য কম্পিউটার এবং ইন্টারনেট ব্যবহার প্রশিক্ষণ'
        : 'Computer and internet skills training for youth',
      location: i18n.language === 'bn' ? 'কম্পিউটার ল্যাব, ভোগদাবুরি' : 'Computer Lab, Vogdaburi',
      schedule: i18n.language === 'bn' ? 'শনি - বৃহস্পতিবার, সকাল ১০টা - বিকাল ৫টা' : 'Saturday - Thursday, 10:00 AM - 5:00 PM',
      participants: 25,
      category: i18n.language === 'bn' ? 'ডিজিটাল' : 'Digital',
      color: 'secondary-orange'
    },
    {
      id: 4,
      title: i18n.language === 'bn' ? 'কমিউনিটি স্বাস্থ্য ক্যাম্প' : 'Community Health Camp',
      description: i18n.language === 'bn'
        ? 'মাসিক স্বাস্থ্য পরীক্ষা এবং সচেতনতা কার্যক্রম'
        : 'Monthly health checkups and awareness programs',
      location: i18n.language === 'bn' ? 'ভোগদাবুরি কমিউনিটি সেন্টার' : 'Vogdaburi Community Center',
      schedule: i18n.language === 'bn' ? 'প্রতিমাসের ২য় ,৩য় ও ৪র্থ সপ্তাহের প্রতি রবিবার  সকাল ০৯-০০ টা থেকে দুপুর ১২ঃ৩০ পর্যন্ত' : 'Every 2nd, 3rd, and 4th Sunday of each month, from 9:00 AM to 12:30 PM.',
      participants: 150,
      category: i18n.language === 'bn' ? 'স্বাস্থ্য' : 'Health',
      color: 'secondary-pink'
    },
  ];

  return (
    <section id="activities" className="bg-light-bg">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-primary mr-3" />
            <h2 className={`text-3xl md:text-4xl font-bold text-light-text ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'চলমান কার্যক্রম' : 'Ongoing Activities'}
            </h2>
          </div>
          <p className={`text-lg text-light-muted max-w-3xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn'
              ? 'ভোগদাবুরিতে বর্তমানে চলমান কমিউনিটি উন্নয়ন কার্যক্রম'
              : 'Currently active community development programs in Vogdaburi'
            }
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-light-surface rounded-xl p-6 shadow-lg border border-light-border hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-4 py-1 bg-${activity.color}/10 text-${activity.color} rounded-full text-sm font-medium ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  {activity.category}
                </span>
                <div className={`flex items-center space-x-2 text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{activity.participants}+</span>
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold text-light-text mb-3 group-hover:text-primary transition-colors ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {activity.title}
              </h3>

              {/* Description */}
              <p className={`text-light-muted mb-4 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                {activity.description}
              </p>

              {/* Details */}
              <div className="space-y-2">
                <div className={`flex items-start space-x-2 text-sm text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{activity.location}</span>
                </div>
                <div className={`flex items-start space-x-2 text-sm text-light-muted ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{activity.schedule}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 pt-4 border-t border-light-border">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm text-green-600 font-medium ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
                    {i18n.language === 'bn' ? 'চলমান' : 'Active Now'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-secondary-teal/10 rounded-2xl p-8">
          <h3 className={`text-2xl font-bold text-light-text mb-3 ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn' ? 'আমাদের সাথে যোগ দিন' : 'Join Our Programs'}
          </h3>
          <p className={`text-light-muted mb-6 max-w-2xl mx-auto ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {i18n.language === 'bn'
              ? 'আপনিও এই কার্যক্রমের অংশ হতে পারেন। স্বেচ্ছাসেবক হিসেবে যোগ দিয়ে কমিউনিটিতে অবদান রাখুন।'
              : 'You can be part of these programs. Join as a volunteer and contribute to the community.'
            }
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Calendar className="w-5 h-5" />
            <span className={`font-medium ${i18n.language === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {i18n.language === 'bn' ? 'যোগাযোগ করুন আরও জানতে' : 'Contact us to learn more'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OngoingActivities;

