'use client';

import React, { useState, useEffect } from 'react';

// Types
interface NewTopBannerProps {
  arrBannerSlide?: string[];
  arrBannerLink?: string[];
  arrInfo?: any;
  arrFunction?: any;
  currentUrl?: string;
  template?: string;
  language?: string;
}

export default function NewTopBanner({
  arrBannerSlide = [],
  arrBannerLink = [],
  arrInfo = null,
  arrFunction = {},
  currentUrl = '',
  template = '',
  language = 'vi'
}: NewTopBannerProps) {

  const [bannerSlides, setBannerSlides] = useState<string[]>([]);
  const [bannerLinks, setBannerLinks] = useState<string[]>([]);

  const t = (key: string) => {
    // Translation function - implement based on your translation system
    const translations: { [key: string]: string } = {
      '_Title Banner_': 'Find Your Dream Job',
      '_Title Join_': 'Join Now',
      '_show_join_bottom_': '1',
      '_change_to_new_slide_': '0'
    };
    return translations[key] || key;
  };

  const getJoinLink = () => {
    if (arrFunction.SHOW_JOIN_TS === 0 && arrFunction.SHOW_JOIN_COLLEGE === 1) {
      return `/joincollege?url=${currentUrl}`;
    } else {
      return `/join?url=${currentUrl}`;
    }
  };

  const getSearchJobComponent = () => {
    if (template === 'p13') {
      return null; // No search component for p13
    } else if (template === 'p411') {
      return 'SearchJobSectionP411'; // Component name for p411
    } else {
      return 'SearchJobSectionP41'; // Default component name
    }
  };

  useEffect(() => {
    // Initialize banner slides
    if (arrBannerSlide.length > 0) {
      setBannerSlides(arrBannerSlide);
      setBannerLinks(arrBannerLink);
    }
  }, [arrBannerSlide, arrBannerLink]);

  useEffect(() => {
    // Initialize Swiper for PC banner
    const initPCSwiper = () => {
      if (typeof window !== 'undefined' && (window as any).Swiper) {
        new (window as any).Swiper('#topBannerSlidePC .swiper-container', {
          lazy: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '#topBannerSlidePC .swiper-pagination',
            clickable: true,
          },
          loop: bannerSlides.length > 1,
        });
      }
    };

    // Initialize Swiper for Mobile banner
    const initMBSwiper = () => {
      if (typeof window !== 'undefined' && (window as any).Swiper) {
        new (window as any).Swiper('#topBannerSlideMB .swiper-container', {
          lazy: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '#topBannerSlideMB .swiper-pagination',
            clickable: true,
          },
          loop: bannerSlides.length > 1,
        });
      }
    };

    // Delay initialization to ensure DOM is ready
    const timerPC = setTimeout(initPCSwiper, 1500);
    const timerMB = setTimeout(initMBSwiper, 2000);

    return () => {
      clearTimeout(timerPC);
      clearTimeout(timerMB);
    };
  }, [bannerSlides]);

  if (arrBannerSlide.length === 0) {
    return null;
  }

  const showJoinButton = !arrInfo && !arrFunction.OFF_JOIN_TALENT_NETWORK;
  const showJoinBottom = t('_show_join_bottom_') && t('_show_join_bottom_') !== '_show_join_bottom_';
  const changeToNewSlide = t('_change_to_new_slide_') === '1';

  return (
    <>
      {/* Desktop Banner */}
      <div className="hidden-xs hidden-sm slidebg SetHeightTopBanner">
        <div className="texton">
          {t('_Title Banner_')}
          {showJoinButton && !showJoinBottom && (
            <div className="join-talent-onclip">
              <a 
                href={getJoinLink()} 
                className={arrFunction.SHOW_JOIN_TS !== 0 ? "btn-gradient showDialogD" : ""}
              >
                {t('_Title Join_')}
              </a>
            </div>
          )}
        </div>
        <div className="cb-banner-home __TopBannerSlide" id="topBannerSlidePC">
          <div className="swiper-container">
            <div className="swiper-wrapper" id="divTopBannerPCSlide">
              {bannerSlides.map((slide, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className="swiper-slide">
                      <div className="image">
                        {bannerLinks[index] ? (
                          <a href={bannerLinks[index]} target="_blank" rel="noopener noreferrer">
                            <img src={slide} alt="" loading="lazy" />
                            <div className="swiper-lazy-preloader"></div>
                          </a>
                        ) : (
                          <>
                            <img src={slide} alt="" loading="lazy" />
                            <div className="swiper-lazy-preloader"></div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="main-page">
            <div className="swiper-pagination"></div>
          </div>
        </div>
        
        {template !== 'p13' && (
          <div className={`container-search ${changeToNewSlide ? 'setOutBanner' : ''}`}>
            {template === 'p411' ? (
              <div>SearchJobSectionP411 Component</div>
            ) : (
              <div>SearchJobSectionP41 Component</div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Banner */}
      <div className="visible-xs visible-sm">
        <div className="cb-banner-home __TopBannerSlide" id="topBannerSlideMB">
          <div className="swiper-container">
            <div className="swiper-wrapper" id="divTopBannerMBSlide">
              {bannerSlides.map((slide, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className="swiper-slide">
                      <div className="image">
                        {bannerLinks[index] ? (
                          <a href={bannerLinks[index]} target="_blank" rel="noopener noreferrer">
                            <img src={slide} alt="" loading="lazy" />
                            <div className="swiper-lazy-preloader"></div>
                          </a>
                        ) : (
                          <>
                            <img src={slide} alt="" loading="lazy" />
                            <div className="swiper-lazy-preloader"></div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="main-page">
            <div className="swiper-pagination"></div>
          </div>
        </div>
        
        {template !== 'p13' && (
          <div className={`container-search ${changeToNewSlide ? 'setOutBanner' : ''}`}>
            {template === 'p411' ? (
              <div>SearchJobSectionP411 Component</div>
            ) : (
              <div>SearchJobSectionP41 Component</div>
            )}
          </div>
        )}
      </div>

      {/* JavaScript for dynamic banner loading */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var arrSlideBanner = ${JSON.stringify(arrBannerSlide)};
            var arrSlideBannerLink = ${JSON.stringify(arrBannerLink)};
            
            $(document).ready(function() {
              setTimeout(function() {
                var strHtmlSliderBanner = '';
                if (arrSlideBanner.length > 0) {
                  $.each(arrSlideBanner, function (k, val) {
                    if (k > 0) {
                      strHtmlSliderBanner += '<div class="swiper-slide">';
                      strHtmlSliderBanner += '<div class="image">';
                      if (arrSlideBannerLink && arrSlideBannerLink[k]) {
                        strHtmlSliderBanner += '<a href="' + arrSlideBannerLink[k] + '" target="_blank">';
                      }
                      strHtmlSliderBanner += '<img src="' + val + '" alt="" loading="lazy"><div class="swiper-lazy-preloader"></div>';
                      if (arrSlideBannerLink && arrSlideBannerLink[k]) {
                        strHtmlSliderBanner += '</a>';
                      }
                      strHtmlSliderBanner += '</div></div>';
                    }
                  });
                  $('#divTopBannerPCSlide').append(strHtmlSliderBanner);
                  if (typeof TopbannerHomePCSlide === 'function') {
                    TopbannerHomePCSlide();
                  }
                }
              }, 1500);
              
              setTimeout(function() {
                var strHtmlSliderBanner = '';
                if (arrSlideBanner.length > 0) {
                  $.each(arrSlideBanner, function (k, val) {
                    if (k > 0) {
                      strHtmlSliderBanner += '<div class="swiper-slide">';
                      strHtmlSliderBanner += '<div class="image">';
                      if (arrSlideBannerLink && arrSlideBannerLink[k]) {
                        strHtmlSliderBanner += '<a href="' + arrSlideBannerLink[k] + '" target="_blank">';
                      }
                      strHtmlSliderBanner += '<img src="' + val + '" alt="" loading="lazy"><div class="swiper-lazy-preloader"></div>';
                      if (arrSlideBannerLink && arrSlideBannerLink[k]) {
                        strHtmlSliderBanner += '</a>';
                      }
                      strHtmlSliderBanner += '</div></div>';
                    }
                  });
                  $('#divTopBannerMBSlide').append(strHtmlSliderBanner);
                  if (typeof TopbannerHomeMBSlide === 'function') {
                    TopbannerHomeMBSlide();
                  }
                }
              }, 2000);
            });
          `
        }}
      />
    </>
  );
}
