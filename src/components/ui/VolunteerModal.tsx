import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, UserPlus } from 'lucide-react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  const isBengali = i18n.language === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary-teal text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <UserPlus className="w-7 h-7" />
              <h2 className={`text-2xl font-bold ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                {isBengali ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন' : 'Join as a Volunteer'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                {isBengali ? 'ধন্যবাদ!' : 'Thank You!'}
              </h3>
              <p className={`text-light-muted ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                {isBengali
                  ? 'আপনার আবেদন সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
                  : 'Your application has been submitted successfully. We will contact you soon.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                  {isBengali ? 'পূর্ণ নাম' : 'Full Name'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={isBengali ? 'আপনার নাম লিখুন' : 'Enter your name'}
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                  {isBengali ? 'ইমেইল' : 'Email'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={isBengali ? 'আপনার ইমেইল লিখুন' : 'Enter your email'}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                  {isBengali ? 'ফোন নম্বর' : 'Phone Number'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={isBengali ? 'আপনার ফোন নম্বর লিখুন' : 'Enter your phone number'}
                />
              </div>

              {/* Interest Area */}
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                  {isBengali ? 'আগ্রহের ক্ষেত্র' : 'Area of Interest'} <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">{isBengali ? 'নির্বাচন করুন' : 'Select an area'}</option>
                  <option value="education">{isBengali ? 'শিক্ষা' : 'Education'}</option>
                  <option value="health">{isBengali ? 'স্বাস্থ্য' : 'Health'}</option>
                  <option value="social">{isBengali ? 'সামাজিক' : 'Social'}</option>
                  <option value="digital">{isBengali ? 'ডিজিটাল সাক্ষরতা' : 'Digital Literacy'}</option>
                  <option value="other">{isBengali ? 'অন্যান্য' : 'Other'}</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                  {isBengali ? 'সময় পাওয়া যায়' : 'Availability'}
                </label>
                <select
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="weekdays">{isBengali ? 'সপ্তাহের দিন' : 'Weekdays'}</option>
                  <option value="weekends">{isBengali ? 'সপ্তাহান্তে' : 'Weekends'}</option>
                  <option value="flexible">{isBengali ? 'নমনীয়' : 'Flexible'}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium text-light-text mb-2 ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
                  {isBengali ? 'বার্তা (ঐচ্ছিক)' : 'Message (Optional)'}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-light-bg border border-light-border rounded-lg text-light-text placeholder-light-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={isBengali ? 'কেন আপনি স্বেচ্ছাসেবক হতে চান?' : 'Why do you want to volunteer?'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 ${isBengali ? 'font-bornomala' : 'font-sans'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isBengali ? 'জমা দেওয়া হচ্ছে...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{isBengali ? 'জমা দিন' : 'Submit Application'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerModal;
