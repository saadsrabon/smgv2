import { useState, useEffect } from 'react';

export const useFounderModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    // Check if modal has been shown before in this session
    const modalShown = sessionStorage.getItem('founderModalShown');
    
    if (!modalShown) {
      // Show modal after 30 seconds
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('founderModalShown', 'true');
      }, 10000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    hasShownModal
  };
};
