'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';

interface Department {
  DEP_ID: number;
  DEP_NAME: string;
  DEP_LOGO: string;
  DEP_PROFILE: string;
  COMPANY_ID: number;
}

interface BoxPartnerP13Props {
  R?: {
    CATE_ID: string;
    CATE_NAME: string;
    CATE_LINK: string;
    CATE_ID_css?: string;
    CATE_ID_title_css?: string;
  };
  k: number;
  language?: 'vi' | 'en';
  arrLstDepartment?: Department[];
  constants?: {
    LINK_JOBS_SEARCH: string;
    STATIC_TN: string;
    IMAGES_TN: string;
    TN: string;
  };
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_View More_': {
      vi: 'Xem thêm',
      en: 'View More'
    },
    '_View Short_': {
      vi: 'Thu gọn',
      en: 'View Short'
    },
    '_View Jobs_': {
      vi: 'Xem việc làm',
      en: 'View Jobs'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to encode URL
function encodeUrl(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to remove unicode
function removeUnicode(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export default function BoxPartnerP13({
  R = {
    CATE_ID: 'partners',
    CATE_NAME: 'Our Partners',
    CATE_LINK: '/partners',
    CATE_ID_css: undefined,
    CATE_ID_title_css: undefined
  },
  k,
  language = 'vi',
  arrLstDepartment = [
    // Sample data for partners
    {
      DEP_ID: 1,
      DEP_NAME: 'Công ty TNHH ABC',
      DEP_LOGO: 'abc-logo.png',
      DEP_PROFILE: '<p><strong>Công ty ABC</strong> là một trong những công ty hàng đầu về công nghệ thông tin tại Việt Nam. Chúng tôi chuyên cung cấp các giải pháp phần mềm, dịch vụ tư vấn và phát triển ứng dụng di động.</p><p>Với đội ngũ nhân viên giàu kinh nghiệm và tâm huyết, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao nhất.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 2,
      DEP_NAME: 'Tập đoàn XYZ',
      DEP_LOGO: 'xyz-logo.png',
      DEP_PROFILE: '<p><strong>Tập đoàn XYZ</strong> hoạt động trong lĩnh vực bất động sản và xây dựng. Chúng tôi có hơn 20 năm kinh nghiệm trong việc phát triển các dự án nhà ở, văn phòng và trung tâm thương mại.</p><p>Chúng tôi luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu trong mọi hoạt động kinh doanh.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 3,
      DEP_NAME: 'Công ty DEF Marketing',
      DEP_LOGO: 'def-logo.png',
      DEP_PROFILE: '<p><strong>DEF Marketing</strong> là công ty chuyên về marketing digital và quảng cáo. Chúng tôi cung cấp các dịch vụ SEO, SEM, social media marketing và content marketing.</p><p>Với đội ngũ creative trẻ trung và năng động, chúng tôi giúp các thương hiệu tăng trưởng mạnh mẽ trên thị trường.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 4,
      DEP_NAME: 'Ngân hàng GHI',
      DEP_LOGO: 'ghi-logo.png',
      DEP_PROFILE: '<p><strong>Ngân hàng GHI</strong> là một trong những ngân hàng thương mại hàng đầu Việt Nam. Chúng tôi cung cấp đầy đủ các dịch vụ ngân hàng từ tiết kiệm, cho vay đến đầu tư tài chính.</p><p>Với hệ thống công nghệ hiện đại và đội ngũ chuyên nghiệp, chúng tôi cam kết mang đến trải nghiệm tốt nhất cho khách hàng.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 5,
      DEP_NAME: 'Công ty JKL Logistics',
      DEP_LOGO: 'jkl-logo.png',
      DEP_PROFILE: '<p><strong>JKL Logistics</strong> chuyên cung cấp dịch vụ vận chuyển và logistics toàn quốc. Chúng tôi có mạng lưới rộng khắp với hơn 100 điểm giao nhận trên cả nước.</p><p>Chúng tôi cam kết giao hàng nhanh chóng, an toàn và tiết kiệm chi phí cho khách hàng.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 6,
      DEP_NAME: 'Tập đoàn MNO',
      DEP_LOGO: 'mno-logo.png',
      DEP_PROFILE: '<p><strong>Tập đoàn MNO</strong> hoạt động đa ngành từ sản xuất, thương mại đến dịch vụ. Chúng tôi có hơn 30 năm kinh nghiệm và là đối tác tin cậy của nhiều doanh nghiệp lớn.</p><p>Với tầm nhìn dài hạn và chiến lược phát triển bền vững, chúng tôi luôn đi đầu trong việc áp dụng công nghệ mới.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 7,
      DEP_NAME: 'Công ty PQR Education',
      DEP_LOGO: 'pqr-logo.png',
      DEP_PROFILE: '<p><strong>PQR Education</strong> là tổ chức giáo dục hàng đầu với hơn 15 năm kinh nghiệm. Chúng tôi cung cấp các khóa học tiếng Anh, kỹ năng mềm và luyện thi chứng chỉ quốc tế.</p><p>Với phương pháp giảng dạy hiện đại và đội ngũ giáo viên bản ngữ, chúng tôi giúp học viên đạt được mục tiêu học tập của mình.</p>',
      COMPANY_ID: 0
    },
    {
      DEP_ID: 8,
      DEP_NAME: 'Công ty STU Healthcare',
      DEP_LOGO: 'stu-logo.png',
      DEP_PROFILE: '<p><strong>STU Healthcare</strong> chuyên cung cấp các dịch vụ y tế và chăm sóc sức khỏe. Chúng tôi có hệ thống phòng khám và bệnh viện hiện đại với đội ngũ bác sĩ giàu kinh nghiệm.</p><p>Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao với chi phí hợp lý cho mọi người dân.</p>',
      COMPANY_ID: 0
    }
  ],
  constants = {
    LINK_JOBS_SEARCH: '/jobs/search',
    STATIC_TN: '/static',
    IMAGES_TN: '/images',
    TN: ''
  }
}: BoxPartnerP13Props) {
  // Use useRef to track previous arrLstDepartment to prevent infinite loops
  const prevArrLstDepartmentRef = useRef<Department[]>([]);
  const [arrDepartmentRand, setArrDepartmentRand] = useState<number[]>([]);
  const [arrCompany, setArrCompany] = useState<Department[]>([]);
  
  useEffect(() => {
    // Check if arrLstDepartment actually changed
    const currentArrLstDepartment = arrLstDepartment || [];
    const prevArrLstDepartment = prevArrLstDepartmentRef.current;
    
    // Simple deep comparison for arrays
    const hasChanged = currentArrLstDepartment.length !== prevArrLstDepartment.length ||
      currentArrLstDepartment.some((dept, index) => 
        !prevArrLstDepartment[index] || 
        dept.DEP_ID !== prevArrLstDepartment[index].DEP_ID
      );
    
    if (!hasChanged) {
      return; // No change, skip update
    }
    
    // Update ref with current value
    prevArrLstDepartmentRef.current = currentArrLstDepartment;
    
    // Filter companies
    const filteredCompanies = currentArrLstDepartment.filter(dept => dept.COMPANY_ID === 0);
    setArrCompany(filteredCompanies);
    
    if (filteredCompanies.length === 0) {
      setArrDepartmentRand([]);
      return;
    }
    
    const randomIndices: number[] = [];
    const maxCount = Math.min(6, filteredCompanies.length);
    
    for (let i = 0; i < maxCount; i++) {
      const randomIndex = Math.floor(Math.random() * filteredCompanies.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    
    setArrDepartmentRand(randomIndices);
  }, [arrLstDepartment]);

  const generateLink = (dep: Department, index: number): string => {
    const title = encodeUrl(removeUnicode(dep.DEP_NAME));
    const depId = dep.DEP_ID;
    
    if (language === 'vi') {
      return `${constants.LINK_JOBS_SEARCH}/doi-tac-${title}.${depId}/${language}`;
    } else {
      return `${constants.LINK_JOBS_SEARCH}/partner-${title}.${depId}/${language}`;
    }
  };

  const handleViewMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const txtShort = target.parentElement?.previousElementSibling as HTMLElement;
    const linkBox = target.parentElement;
    const container = linkBox?.parentElement?.parentElement?.parentElement as HTMLElement;
    
    if (txtShort && linkBox && container) {
      const isExpanded = txtShort.style.maxHeight === 'none';
      
      if (isExpanded) {
        txtShort.style.maxHeight = '108px';
        target.textContent = t('_View More_', language);
        
        // Check if all items are collapsed
        const allCollapsed = Array.from(container.querySelectorAll('.txt-short')).every(
          (el: any) => el.style.maxHeight !== 'none'
        );
        
        if (allCollapsed) {
          container.style.height = '350px';
        }
      } else {
        txtShort.style.maxHeight = 'none';
        target.textContent = t('_View Short_', language);
        container.style.height = 'auto';
      }
    }
  };

  // Check if view more button should be hidden
  useEffect(() => {
    const checkViewMoreButtons = () => {
      const innerFckElements = document.querySelectorAll('.inner_fck');
      innerFckElements.forEach((element) => {
        const height = (element as HTMLElement).offsetHeight;
        const linkBox = element.parentElement?.nextElementSibling;
        const viewMoreBtn = linkBox?.querySelector('.click_viewmore') as HTMLElement;
        
        if (height <= 115 && viewMoreBtn) {
          viewMoreBtn.style.display = 'none';
        }
      });
    };

    // Check after component mounts and when data changes
    setTimeout(checkViewMoreButtons, 100);
  }, [arrDepartmentRand]);

  return (
    <>
      <div 
        id={R.CATE_ID} 
        className={`section-page news-three-items-s2 ${k % 2 === 1 ? 'bg-odd' : ''}`}
        style={R.CATE_ID_css ? (() => {
          try {
            return { ...JSON.parse(R.CATE_ID_css) };
          } catch {
            return {};
          }
        })() : {}}
      >
      <div className="container">
        <header className="container-fluid">
          <h2 
            className="section-title"
            style={R.CATE_ID_title_css ? (() => {
              try {
                return { ...JSON.parse(R.CATE_ID_title_css) };
              } catch {
                return {};
              }
            })() : {}}
          >
            {R.CATE_NAME}
          </h2>
        </header>
        <div className="container-fluid">
          {arrDepartmentRand.length === 0 ? (
            // Skeleton loading
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="col-xs-12 col-sm-6 col-md-4">
                  <div className="col-xs-12 img-box">
                    <div 
                      style={{
                        width: '100%',
                        height: '120px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        animation: 'skeletonPulse 1.5s ease-in-out infinite'
                      }}
                    />
                  </div>
                  <h3 className="boxhead">
                    <div 
                      style={{
                        height: '20px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        animation: 'skeletonPulse 1.5s ease-in-out infinite'
                      }}
                    />
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              {arrDepartmentRand.map((depIndex, index) => {
            const dep = arrCompany[depIndex];
            if (!dep) return null;

            const link = generateLink(dep, index);
            const title = encodeUrl(removeUnicode(dep.DEP_NAME));

            return (
              <div key={dep.DEP_ID} className="col-xs-12 col-sm-6 col-md-4">
                <div className="col-xs-12 img-box">
                  <a 
                    href={link} 
                    title={dep.DEP_NAME}
                    style={{
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#f8f9fa',
                      border: '2px dashed #dee2e6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6c757d',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    📄 {dep.DEP_NAME}
                  </a>
                </div>
                <h3 className="boxhead">
                  <a href={link} title={dep.DEP_NAME}>
                    {dep.DEP_NAME}
                  </a>
                </h3>
                <div className="txt-short content_fck">
                  <div 
                    className="inner_fck"
                    dangerouslySetInnerHTML={{
                      __html: dep.DEP_PROFILE.replace(/<[^>]*>/g, (match) => {
                        const allowedTags = ['p', 'strong', 'b'];
                        const tagName = match.replace(/<\/?([^>\s]+).*>/g, '$1');
                        return allowedTags.includes(tagName) ? match : '';
                      })
                    }}
                  />
                </div>
                <p className="link-box">
                  <a 
                    href="javascript:void(0)" 
                    onClick={handleViewMore}
                    className="click_viewmore"
                  >
                    {t('_View More_', language)}
                  </a>
                  <a href={link}>
                    {t('_View Jobs_', language)}
                  </a>
                </p>
              </div>
            );
          })}
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-xs-3 btn-viewmore">
            <a href={`${constants.TN}${R.CATE_LINK}`} className="btn btn-block btn-primary">
              {t('_View More_', language)}
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes skeletonPulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </>
  );
}
