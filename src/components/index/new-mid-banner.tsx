'use client';

import React, { useEffect, useState } from 'react';

// Types
interface BannerProperty {
  url?: string;
  newtab?: number;
}

interface RewriteInfo {
  RW_BANNER?: string;
  RW_BANNER_PROPERTY?: string;
}

interface NewMidBannerProps {
  arrRwInfo?: RewriteInfo;
  LINK_RW_IMAGES?: string;
  IMAGES_TN?: string;
}

// Helper function to unserialize PHP serialized data
function unserialize(str: string): Record<number, BannerProperty> {
  try {
    // This is a simplified unserialize function
    // In a real implementation, you might want to use a proper PHP unserialize library
    if (!str) return {};
    
    // For now, return empty object - you might need to implement proper unserialize
    // or pass the data in a different format from the backend
    return {};
  } catch (error) {
    console.error('Error unserializing data:', error);
    return {};
  }
}

export default function NewMidBanner({
  arrRwInfo,
  LINK_RW_IMAGES = '/themes/images/rewrite',
  IMAGES_TN = '/themes/images/rewrite'
}: NewMidBannerProps) {
  
  const [banners, setBanners] = useState<string[]>([]);
  const [bannerProperties, setBannerProperties] = useState<Record<number, BannerProperty>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!arrRwInfo?.RW_BANNER) return;

    // Parse banner string
    const bannerString = arrRwInfo.RW_BANNER;
    const bannerArray = bannerString.split(';');
    
    // Parse banner properties
    const properties = unserialize(arrRwInfo.RW_BANNER_PROPERTY || '');
    
    setBanners(bannerArray);
    setBannerProperties(properties);

    // Initialize Swiper after a delay (similar to original PHP logic)
    const timer = setTimeout(() => {
      initializeSwiper();
    }, 2500);

    return () => clearTimeout(timer);
  }, [arrRwInfo]);

  const initializeSwiper = () => {
    if (typeof window !== 'undefined' && (window as any).Swiper) {
      // Check if already initialized
      const swiperWrapper = document.getElementById('divMiddleBannerSlide');
      if (swiperWrapper && (swiperWrapper as any).dataset.initialized) {
        return;
      }

      // Mark as initialized
      if (swiperWrapper) {
        (swiperWrapper as any).dataset.initialized = 'true';
      }

      // Initialize Swiper
      new (window as any).Swiper("#middleBannerSlide .swiper-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: "#middleBannerSlide .swiper-pagination",
          clickable: true
        },
        lazy: {
          loadPrevNext: true
        }
      });
    }
  };

  if (!arrRwInfo?.RW_BANNER || banners.length === 0) {
    return null;
  }

  return (
    <div className="hidden-xs hidden-sm" id="middleBanner">
      <div className="cb-banner-home" id="middleBannerSlide">
        <div className="swiper-container">
          <div className="swiper-wrapper" id="divMiddleBannerSlide">
            {banners.map((banner, index) => {
              const property = bannerProperties[index];
              const imageSrc = `${LINK_RW_IMAGES}/${banner}`;
              
              return (
                <div key={index} className="swiper-slide">
                  <div className="image">
                    {property?.url ? (
                      <a 
                        href={property.url}
                        {...(property.newtab === 1 ? { target: '_blank' } : {})}
                      >
                        <img 
                          src={imageSrc} 
                          alt="" 
                          loading="lazy"
                        />
                        <div className="swiper-lazy-preloader"></div>
                      </a>
                    ) : (
                      <>
                        <img 
                          src={imageSrc} 
                          alt="" 
                          loading="lazy"
                        />
                        <div className="swiper-lazy-preloader"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="main-page">
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}
