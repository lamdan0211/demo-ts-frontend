'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './SwiperBanner.module.css';

interface BannerItem {
  id: string | number;
  image: string;
  title?: string;
  description?: string;
  link?: string;
  alt?: string;
}

interface SwiperBannerProps {
  banners: BannerItem[];
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  height?: string | 'auto';
  loop?: boolean;
}

const SwiperBanner: React.FC<SwiperBannerProps> = ({
  banners,
  className = '',
  autoplay = true,
  autoplayDelay = 5000,
  showPagination = true,
  showNavigation = true,
  height = '400px',
  loop = true
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !banners || banners.length === 0) {
    return (
      <div 
        className={`${styles['swiper-banner-loading']} ${className}`}
        style={{ 
          height: height === 'auto' ? 'auto' : height, 
          background: '#f5f5f5', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <div>Loading banner...</div>
      </div>
    );
  }

  const containerStyle = height === 'auto' 
    ? { height: 'auto' }
    : { height };

  return (
    <div className={`${styles['swiper-banner-container']} ${className}`} style={containerStyle}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={loop && banners.length > 1}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
        } : false}
        pagination={showPagination ? {
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        } : false}
        navigation={showNavigation && banners.length > 1}
        className={styles['swiper-banner']}
        style={{ height: height === 'auto' ? 'auto' : '100%' }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id || index}>
            <div className={styles['swiper-slide-content']} style={{ position: 'relative', height: height === 'auto' ? 'auto' : '100%' }}>
              {banner.link ? (
                <a 
                  href={banner.link} 
                  style={{ 
                    display: 'block', 
                    height: '100%', 
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <img
                    src={banner.image}
                    alt={banner.alt || banner.title || `Banner ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {(banner.title || banner.description) && (
                    <div 
                      className={styles['swiper-slide-overlay']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        color: 'white',
                        padding: '20px',
                        textAlign: 'center'
                      }}
                    >
                      {banner.title && (
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
                          {banner.title}
                        </h3>
                      )}
                      {banner.description && (
                        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
                          {banner.description}
                        </p>
                      )}
                    </div>
                  )}
                </a>
              ) : (
                <>
                  <img
                    src={banner.image}
                    alt={banner.alt || banner.title || `Banner ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {(banner.title || banner.description) && (
                    <div 
                      className={styles['swiper-slide-overlay']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        color: 'white',
                        padding: '20px',
                        textAlign: 'center'
                      }}
                    >
                      {banner.title && (
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
                          {banner.title}
                        </h3>
                      )}
                      {banner.description && (
                        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
                          {banner.description}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperBanner;
