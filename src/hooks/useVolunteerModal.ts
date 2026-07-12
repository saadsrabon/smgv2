import { useState, useEffect, useCallback } from 'react';

export function useVolunteerModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener('volunteer:open', handleOpen);
    return () => window.removeEventListener('volunteer:open', handleOpen);
  }, [openModal]);

  return { isOpen, openModal, closeModal };
}

export function openVolunteerModal() {
  window.dispatchEvent(new Event('volunteer:open'));
}
