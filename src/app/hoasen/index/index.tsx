'use client';

import React, { useEffect } from 'react';
import { RewriteInfo, Industry, Location } from '@/lib/types';
import SearchJobSectionP31 from '@/components/index/_searchjob_section_p31';
import BoxCareerP31 from '@/components/index/box-career-p31';
import IndexNewsP31 from '@/components/index/index-news-p31';
import IndexListJobP31 from '@/components/index/index-listjob-p31';
import BoxPartnerP13 from '@/components/index/box-partner-p13';
import { SwiperBanner } from '@/components/UI';

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
        // Sliders are now handled by SwiperBanner components
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

  // Parse banner data for Swiper
  const parseBannerData = () => {
    if (arrRwInfo?.RW_BANNER_TOP) {
      const arrBannerSlide = arrRwInfo.RW_BANNER_TOP.split(';').map((item: string, index: number) => ({
        id: index,
        image: `/themes/${siteId}/images/${item}`,
        alt: `Banner ${index + 1}`,
        title: `Welcome to Hoasen ${index + 1}`,
        description: `Find your dream job with us - Slide ${index + 1}`
      }));
      return arrBannerSlide;
    }
    
    // Fallback to default banners
    return [
      {
        id: 0,
        image: `/themes/${siteId}/images/banner1.jpg`,
        alt: 'Banner 1',
        title: 'Welcome to Hoasen Job Portal',
        description: 'Find your dream job with us!'
      },
      {
        id: 1,
        image: `/themes/${siteId}/images/banner2.jpg`,
        alt: 'Banner 2',
        title: 'Top Companies Hiring',
        description: 'Connect with leading employers'
      },
      {
        id: 2,
        image: `/themes/${siteId}/images/banner3.jpg`,
        alt: 'Banner 3',
        title: 'Career Growth Opportunities',
        description: 'Advance your career with us'
      }
    ];
  };

  const bannerData = parseBannerData();

  return (
    <>

      {/* Desktop Slider */}
      <div suppressHydrationWarning={true}>
        <div className="ads-pre">
          <div className="texton" suppressHydrationWarning={true}>
            <h1>Welcome to Hoasen Job Portal</h1>
            <p>Find your dream job with us!</p>
          </div>
          <SwiperBanner
            banners={bannerData}
            height="auto"
            autoplay={true}
            autoplayDelay={5000}
            showPagination={true}
            showNavigation={bannerData.length > 1}
            loop={bannerData.length > 1}
            className="hoasen-banner"
          />
        </div>
              {/* Search Container */}
      <div className="container-search setOutBanner">
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
        />
      </div>
      </div>

      {/* Career Section */}
      <BoxCareerP31
        R={{ CATE_ID: 1 }}
        k={0}
        STATIC_TN="/static"
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
            }
           
          ]
        }}
        language={language as 'vi' | 'en'}
      />

      
      {/* Main Banner Slider */}
      <div className="hidden-xs hidden-sm">
        <div className="ads-pre">
          <SwiperBanner
            banners={bannerData}
            height="auto"
            autoplay={true}
            autoplayDelay={5000}
            showPagination={true}
            showNavigation={bannerData.length > 1}
            loop={bannerData.length > 1}
            className="hoasen-main-banner"
          />
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
              NEWS_PICTURE: 'imagesnews1.jpg',
              LINK: `/${siteId}/news/hoasen-expand-steel-factory`,
              NUMROW: 8
            },
            {
              NEWS_TITLE: 'Chương trình đào tạo nhân viên mới 2024',
              NEWS_SUBCONTENT: 'Hoa Sen Group triển khai chương trình đào tạo toàn diện cho nhân viên mới với các khóa học chuyên sâu về sản xuất thép.',
              NEWS_PICTURE: 'imagesnews2.jpg',
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
            },
            {
              NEWS_TITLE: 'Hoa Sen mở rộng thị trường xuất khẩu',
              NEWS_SUBCONTENT: 'Tập đoàn Hoa Sen tiếp tục mở rộng thị trường xuất khẩu sang các nước Đông Nam Á và châu Phi với sản phẩm thép chất lượng cao.',
              NEWS_PICTURE: 'news6.jpg',
              LINK: `/${siteId}/news/hoasen-export-market-expansion`,
              NUMROW: 8
            }
          ]
        }}
        indexBackground={1}
        language={language as 'vi' | 'en'}
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
        showLogoListJob={true}
        STATIC_TN="/static"
        IMAGES_TN="/themes/hoasen/images"
        arrJobs={[
          {
            JOB_TITLE: 'Kỹ sư sản xuất thép',
            LINK: '/hoasen/jobs/steel-engineer',
            JOB_LOCATION_NAME: 'Bình Dương',
            JOB_SALARYUNIT: 'VND',
            JOB_FROMSALARY: 15000000,
            JOB_TOSALARY: 25000000,
            JOB_EXPIREDATE: '2024-12-31',
            JOB_BENEFITS: '1,2,3',
            DEP_ID: 1,
            logo_dep: 'logo-hoasen.png'
          },
          {
            JOB_TITLE: 'Chuyên viên kỹ thuật',
            LINK: '/hoasen/jobs/technical-specialist',
            JOB_LOCATION_NAME: 'TP.HCM',
            JOB_SALARYUNIT: 'VND',
            JOB_FROMSALARY: 12000000,
            JOB_TOSALARY: 20000000,
            JOB_EXPIREDATE: '2024-12-31',
            JOB_BENEFITS: '1,2,4',
            DEP_ID: 2,
            logo_dep: 'logo-hoasen.png'
          },
          {
            JOB_TITLE: 'Quản lý dự án',
            LINK: '/hoasen/jobs/project-manager',
            JOB_LOCATION_NAME: 'Hà Nội',
            JOB_SALARYUNIT: 'VND',
            JOB_FROMSALARY: 20000000,
            JOB_TOSALARY: 35000000,
            JOB_EXPIREDATE: '2024-12-31',
            JOB_BENEFITS: '1,2,3,4',
            DEP_ID: 3,
            logo_dep: 'logo-hoasen.png'
          }
        ]}
        arrLstBenefit={[
          { BENEFIT_ID: 1, BENEFIT_NAME: 'Bảo hiểm y tế', BENEFIT_ICON: 'fa-heart' },
          { BENEFIT_ID: 2, BENEFIT_NAME: 'Nghỉ phép có lương', BENEFIT_ICON: 'fa-calendar' },
          { BENEFIT_ID: 3, BENEFIT_NAME: 'Đào tạo chuyên môn', BENEFIT_ICON: 'fa-graduation-cap' },
          { BENEFIT_ID: 4, BENEFIT_NAME: 'Thưởng hiệu suất', BENEFIT_ICON: 'fa-trophy' }
        ]}
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
