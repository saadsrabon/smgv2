import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FounderModal: React.FC<FounderModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay for smooth animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isBengali = i18n.language === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden transform transition-all duration-300 border border-gray-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl sm:text-2xl font-bold ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
              {t('modal.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className={`text-gray-700 leading-relaxed whitespace-pre-line ${isBengali ? 'font-bornomala text-base sm:text-lg' : 'font-sans'}`}>
            {t('modal.content')}
          </div>
          
          {/* Signature */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className={`text-right text-gray-600 font-semibold ${isBengali ? 'font-bornomala' : 'font-sans'}`}>
              {t('modal.signature').split('\n').map((line, index) => (
                <div key={index} className={index === 0 ? 'font-bold text-lg' : 'text-sm mt-1'}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${isBengali ? 'font-bornomala' : 'font-sans'}`}
          >
            {t('modal.close')}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FounderModal;
