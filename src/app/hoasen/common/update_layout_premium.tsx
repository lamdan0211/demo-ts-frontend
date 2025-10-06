'use client';

import React, { useEffect } from 'react';

interface UpdateLayoutPremiumProps {
  // No specific props needed
}

export default function UpdateLayoutPremium({}: UpdateLayoutPremiumProps) {
  
  useEffect(() => {
    // Initialize Fancybox for showDialog elements
    const initFancybox = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery('.showDialog').fancybox({
          'padding': 0,
          onComplete: function() {
            const fancyboxContent = (window as any).jQuery('#fancybox-content');
            const fancyboxWrap = (window as any).jQuery('#fancybox-wrap');
            if (fancyboxContent.length && fancyboxWrap.length) {
              fancyboxWrap.css({
                'width': (fancyboxContent.width() + 40) + 'px',
                'padding': 0
              });
            }
          }
        });
      }
    };

    // Wait for jQuery to be available
    const checkJQuery = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        initFancybox();
      } else {
        setTimeout(checkJQuery, 100);
      }
    };

    checkJQuery();
  }, []);

  return null; // This component doesn't render anything
}
