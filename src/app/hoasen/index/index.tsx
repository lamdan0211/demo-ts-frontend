'use client';

import React, { useEffect } from 'react';
import { RewriteInfo, Industry, Location } from '@/lib/types';
import SearchJobSectionP31 from '@/components/index/_searchjob_section_p31';
import BoxCareerP31 from '@/components/index/box-career-p31';
import IndexNewsP31 from '@/components/index/index-news-p31';
import IndexListJobP31 from '@/components/index/index-listjob-p31';
import BoxPartnerP13 from '@/components/index/box-partner-p13';

interface HoasenIndexProps {
  siteId: string;
  arrRwInfo: RewriteInfo;
  arrIndustries: Industry[];
  arrLocations: Location[];
  language: string;
}

export default function HoasenIndex({
  siteId,
  arrRwInfo,
  arrIndustries,
  arrLocations,
  language = 'vi'
}: HoasenIndexProps) {
  useEffect(() => {
    // Wait for DOM to be ready and jQuery to be available
    const initSlider = () => {
      if (typeof window === 'undefined') return;
      
      const checkAndInit = () => {
        const $ = (window as any).$;
        
        if (!$ || !$.fn) {
          // jQuery not ready yet, try again in 100ms
          setTimeout(checkAndInit, 100);
          return;
        }

        // Load Cycle plugin if not already loaded
        if (!$.fn.cycle) {
          const script = document.createElement('script');
          script.src = '/themes/js/jquery.cycle.all.2.74.js';
          script.onload = () => {
            // Wait a bit for the plugin to initialize
            setTimeout(initializeSliders, 200);
          };
          script.onerror = () => {
            console.error('Failed to load jQuery Cycle plugin');
          };
          document.head.appendChild(script);
        } else {
          initializeSliders();
        }
      };

      const initializeSliders = () => {
        const $ = (window as any).$;
        
        if (!$ || !$.fn.cycle) {
          console.error('jQuery Cycle plugin not available');
          return;
        }


        // Initialize desktop slider
        if ($('#sliderTopMain').length > 0) {
          $('#sliderTopMain').cycle({
            fx: 'fade',
            timeout: 5000,
            pauseOnPagerHover: true,
            pager: '#pagerTopMain',
            pagerAnchorBuilder: function(idx: number, slide: any) { 
              return '#pagerTopMain li:eq(' + idx + ')'; 
            }
          });
        }

        // Initialize main banner slider
        if ($('#slidehr').length > 0) {
          $('#slidehr').cycle({
            fx: 'fade',
            timeout: 5000,
            pauseOnPagerHover: true,
            pager: '#pager',
            pagerAnchorBuilder: function(idx: number, slide: any) { 
              return '#pager li:eq(' + idx + ')'; 
            }
          });
        }

        // Position pagers
        const positionPagers = () => {
          const $pagers = ['#pagerTopMain', '#pager'];
          $pagers.forEach(selector => {
            const $pager = $(selector);
            if ($pager.length) {
              const posPage = ($(window).width() - $pager.width()) / 2;
              $pager.css({'left': posPage + 'px'});
              $pager.show();
            }
          });
        };

        // Position pagers after a short delay
        setTimeout(positionPagers, 500);
        
        $(window).on('resize', positionPagers);
      };

      // Start checking when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndInit);
      } else {
        checkAndInit();
      }
    };

    initSlider();
  }, []);

  // Parse banner data
  const parseBannerData = () => {
    if (arrRwInfo?.RW_BANNER_TOP) {
      const arrBannerSlide = arrRwInfo.RW_BANNER_TOP.split(';').map((item: string) => 
        `/themes/${siteId}/images/${item}`
      );
      return { arrBannerSlide, arrBannerLink: [] };
    }
    
    // Fallback to default banners
    return {
      arrBannerSlide: [
        `/themes/${siteId}/images/banner1.jpg`,
        `/themes/${siteId}/images/banner2.jpg`,
        `/themes/${siteId}/images/banner3.jpg`
      ],
      arrBannerLink: []
    };
  };

  const { arrBannerSlide, arrBannerLink } = parseBannerData();

  return (
    <>

      {/* Desktop Slider */}
      <div>
        <div className="ads-pre slidebg sliderSetheight">
          <div className="texton">
            <h1>Welcome to Hoasen Job Portal</h1>
            <p>Find your dream job with us!</p>
          </div>
          <div id="sliderTopMain">
            {arrBannerSlide.map((banner: string, index: number) => (
              <div key={index} className="bgimage" style={{backgroundImage: `url(${banner})`}}>
                {arrBannerLink[index] && (
                  <a 
                    href={arrBannerLink[index]} 
                    target="_blank" 
                    style={{height: '100%', width: '100%'}} 
                    className="mask-banner"
                  >
                    &nbsp;
                  </a>
                )}
              </div>
            ))}
          </div>
          {arrBannerSlide.length > 1 && (
            <ul id="pagerTopMain">
              {arrBannerSlide.map((_: any, index: number) => (
                <li key={index}>
                  <a href="#" onClick={(e) => e.preventDefault()}></a>
                </li>
              ))}
            </ul>
          )}
        </div>
              {/* Search Container */}
      <div className="container-search setOutBanner" style={{marginTop:'105px'}}>
        <SearchJobSectionP31
          arrIndustries={arrIndustries}
          getAllLocateCountry={[
            {
              NAME: 'Việt Nam',
              LOCATION: arrLocations.map(loc => ({
                LOCATION_ID: loc.LOCATION_ID,
                LOCATION_NAME: loc.LOCATION_NAME,
                LOCATION_CODE: loc.LOCATION_CODE || '',
                LOCATION_LINK: loc.LOCATION_LINK || '',
                LOCATION_COUNT: loc.LOCATION_COUNT || 0
              }))
            }
          ]}
          language={language as 'vi' | 'en'}
          LINK_JOBS_SEARCH={`/${siteId}/jobs/search`}
          LANGUAGE={language}
        />
      </div>
      </div>





      {/* Career Section */}
      <BoxCareerP31
        R={{ CATE_ID: 1 }}
        k={0}
        arrHomeContent={{
          1: [
            {
              INDUSTRY_NAME: 'Sản xuất thép',
              LINK: `/${siteId}/jobs/steel`,
              JOB_INDUSTRY_NUM: 15
            },
            {
              INDUSTRY_NAME: 'Xây dựng',
              LINK: `/${siteId}/jobs/construction`,
              JOB_INDUSTRY_NUM: 8
            },
            {
              INDUSTRY_NAME: 'Kỹ thuật',
              LINK: `/${siteId}/jobs/engineering`,
              JOB_INDUSTRY_NUM: 12
            },
            {
              INDUSTRY_NAME: 'Quản lý',
              LINK: `/${siteId}/jobs/management`,
              JOB_INDUSTRY_NUM: 6
            },
            {
              INDUSTRY_NAME: 'Bán hàng',
              LINK: `/${siteId}/jobs/sales`,
              JOB_INDUSTRY_NUM: 10
            }
          ]
        }}
        language={language as 'vi' | 'en'}
        STATIC_TN="/static"
      />

      
      {/* Main Banner Slider */}
      <div className="hidden-xs hidden-sm">
        <div className="ads-pre slidebg">
          <div id="slidehr">
            {arrBannerSlide.map((banner: string, index: number) => (
              <div key={index} className="bgimage" style={{backgroundImage: `url(${banner})`}}>
                {arrBannerLink[index] && (
                  <a 
                    href={arrBannerLink[index]} 
                    target="_blank" 
                    style={{height: '100%', width: '100%'}} 
                    className="mask-banner"
                  >
                    &nbsp;
                  </a>
                )}
              </div>
            ))}
          </div>
          {arrBannerSlide.length > 1 && (
            <ul id="pager">
              {arrBannerSlide.map((_: any, index: number) => (
                <li key={index}>
                  <a href="#" onClick={(e) => e.preventDefault()}></a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* News Section */}
      <IndexNewsP31
        R={{
          CATE_ID: 3,
          CATE_NAME: 'Tin tức',
          CATE_CODE: 'news'
        }}
        arrHomeContent={{
          3: [
            {
              NEWS_TITLE: 'Hoa Sen Group mở rộng nhà máy sản xuất thép mới',
              NEWS_SUBCONTENT: 'Tập đoàn Hoa Sen vừa công bố kế hoạch xây dựng nhà máy sản xuất thép mới tại Bình Dương với tổng vốn đầu tư 500 triệu USD.',
              NEWS_PICTURE: 'news1.jpg',
              LINK: `/${siteId}/news/hoasen-expand-steel-factory`,
              NUMROW: 8
            },
            {
              NEWS_TITLE: 'Chương trình đào tạo nhân viên mới 2024',
              NEWS_SUBCONTENT: 'Hoa Sen Group triển khai chương trình đào tạo toàn diện cho nhân viên mới với các khóa học chuyên sâu về sản xuất thép.',
              NEWS_PICTURE: 'news2.jpg',
              LINK: `/${siteId}/news/employee-training-program-2024`,
              NUMROW: 8
            },
            {
              NEWS_TITLE: 'Hoa Sen đạt chứng nhận ISO 9001:2015',
              NEWS_SUBCONTENT: 'Tập đoàn Hoa Sen vinh dự nhận được chứng nhận ISO 9001:2015 về hệ thống quản lý chất lượng quốc tế.',
              NEWS_PICTURE: 'news3.jpg',
              LINK: `/${siteId}/news/hoasen-iso-certification`,
              NUMROW: 8
            },
            {
              NEWS_TITLE: 'Triển lãm công nghệ sản xuất thép 2024',
              NEWS_SUBCONTENT: 'Hoa Sen Group tham gia triển lãm công nghệ sản xuất thép quốc tế tại TP.HCM với nhiều sản phẩm mới.',
              NEWS_PICTURE: 'news4.jpg',
              LINK: `/${siteId}/news/steel-technology-exhibition-2024`,
              NUMROW: 8
            },
            {
              NEWS_TITLE: 'Chính sách phúc lợi nhân viên được cải thiện',
              NEWS_SUBCONTENT: 'Tập đoàn Hoa Sen công bố gói phúc lợi mới cho nhân viên bao gồm bảo hiểm y tế, nghỉ phép có lương và nhiều chế độ khác.',
              NEWS_PICTURE: 'news5.jpg',
              LINK: `/${siteId}/news/improved-employee-benefits`,
              NUMROW: 8
            }
          ]
        }}
        indexBackground={1}
        language={language as 'vi' | 'en'}
        LANGUAGE={language}
        IMAGES_TN={`/themes/${siteId}/images`}
        TN={`/${siteId}`}
        idNews2="2"
        idNews="1"
        idCareer="3"
        slideBannerLinkCustom=""
        slideBannerLinkCustomLink=""
      />

      {/* Job Listings Section */}
      <IndexListJobP31
        indexBackground={2}
        language={language as 'vi' | 'en'}
      />

      {/* Partner Section */}
      <BoxPartnerP13
        k={3}
        language={language as 'vi' | 'en'}
      />

      {/* Content Sections */}
      <div className="section-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="featured-jobs">
                <h2>Featured Jobs</h2>
                <p>Discover exciting career opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
