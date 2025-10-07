'use client';

import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  id, 
  title, 
  children, 
  isOpen, 
  onClose, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id={`fancybox-overlay-${id}`}
      className={`${styles.fancyboxOverlay} ${isVisible ? styles.visible : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        id={`fancybox-wrap-${id}`}
        className={`${styles.fancyboxWrap} ${className}`}
      >
        {/* Close button */}
        <button
          className={styles.fancyboxClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal content */}
        <div 
          id={`fancybox-content-${id}`}
          className={styles.fancyboxContent}
        >
          {title && (
            <h3 className={styles.modalTitle}>
              {title}
            </h3>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;