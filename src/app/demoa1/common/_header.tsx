'use client';

import { useState, useEffect } from 'react';
import { HeaderProps, MenuCategory, EmployerInfo, UserInfo } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import { useModal } from '@/hooks/useModal';
import { WhyJoinModal } from '@/components/UI';

// Helper function to convert decimal to hex (equivalent to PHP dec2hex)
function dec2hex(dec: number): string {
  return dec.toString(16);
}

// Helper function to generate URL based on category type and data
function generateUrl(category: MenuCategory, constants: { TN: string; JSK: string; LANGUAGE: string }): string {
  const { CATE_TYPE, CATE_CODE, CATE_ID, CATE_LINK, SUBURL_ID, SUBURL_VALUE } = category;
  
  if ((CATE_TYPE === 2 || CATE_TYPE === 3) && CATE_CODE) {
    return `${constants.TN}/${CATE_CODE}-${dec2hex(CATE_ID)}/${constants.LANGUAGE}`;
  }
  
  if (SUBURL_ID) {
    return `${constants.TN}${SUBURL_VALUE}`;
  }
  
  if (CATE_LINK === '#') {
    return 'javascript:void(0)';
  }
  
  return CATE_LINK || '#';
}

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Stay Connected_': {
      vi: 'Kết nối với chúng tôi',
      en: 'Stay Connected'
    },
    'Why?': {
      vi: 'Tại sao?',
      en: 'Why?'
    },
    '_Sign In_': {
      vi: 'Đăng nhập',
      en: 'Sign In'
    },
    '_Jobseeker_': {
      vi: 'Ứng viên',
      en: 'Jobseeker'
    },
    '_Join Our Talent Network_': {
      vi: 'Tham gia Mạng lưới Tài năng',
      en: 'Join Our Talent Network'
    },
    '_content_why_join_': {
      vi: 'Tham gia mạng lưới tài năng để có cơ hội việc làm tốt nhất.',
      en: 'Join our talent network to get the best job opportunities.'
    },
    '_Join our Talent Network today!_': {
      vi: 'Tham gia Mạng lưới Tài năng ngay hôm nay!',
      en: 'Join our Talent Network today!'
    },
    'Continute': {
      vi: 'Tiếp tục',
      en: 'Continue'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to detect other language
function detectOtherLanguage(lang: string, showText: boolean = false): string {
  const otherLang = lang === 'vi' ? 'en' : 'vi';
  return showText ? otherLang.toUpperCase() : otherLang;
}

// Helper function to check if menu item is active
function isMenuActive(
  category: MenuCategory, 
  currentController: string, 
  currentAction: string, 
  newsCateParent?: number
): boolean {
  const { CATE_ID, SUBURL_CONTROLLER, SUBURL_ACTION } = category;
  
  if (newsCateParent && currentController === 'news' && CATE_ID === newsCateParent) {
    return true;
  }
  
  if (currentController === SUBURL_CONTROLLER) {
    if (!SUBURL_ACTION) return true;
    if (currentAction === SUBURL_ACTION) return true;
    if (SUBURL_ACTION.includes(',')) {
      const actions = SUBURL_ACTION.split(',');
      return actions.includes(currentAction);
    }
  }
  
  return false;
}

export default function Header({ 
  siteId, 
  arrRwInfo, 
  arrEmployer, 
  arrInfo, 
  controller, 
  action, 
  arrMenuCates = [], 
  listFeatureCareer = [],
  currentUrl,
  changeLangUrl,
  newsCateParent
}: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!arrInfo);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { isOpen: isWhyJoinOpen, openModal: openWhyJoin, closeModal: closeWhyJoin } = useModal();
  
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  const constants = siteConfig.constants;

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    setIsMobile(checkMobile());
  }, []);

  return (
    <div className="headerfront" id="header-container">
      <div id="header">
        <div id="logo">
          {arrRwInfo && (
            <a href={constants.TN} target="_blank" suppressHydrationWarning={true}>
              <img 
                alt={arrEmployer?.EMP_NAME || 'Logo'} 
                src={`${constants.LINK_RW_IMAGES}/${arrRwInfo.RW_LOGO || 'logo.png'}`}
                suppressHydrationWarning={true}
              />
            </a>
          )}
        </div>
        
        <div id="header-join-container" className={arrInfo ? 'logined' : ''}>
          <div className="joinarea">
            {!arrInfo && controller !== 'hremployer' && (
              <div id="header-join">
                <a href={`/join?url=${currentUrl}`} className="buttonJoin showDialogD">
                  {t('title_join_our_tn', siteConfig.language)}
                </a>
                <p className="col_theme stayconnect">
                  {t('_Stay Connected_', siteConfig.language)}. 
                  <button 
                    onClick={openWhyJoin}
                    className="line_bot link_theme"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit'
                    }}
                  >
                    {t('Why?', siteConfig.language)}
                  </button>
                </p>
              </div>
            )}
            
            <div id="lang">
              {arrInfo && controller !== 'hremployer' ? (
                <div className="language_top">
                  <a href={changeLangUrl} className={`flag ${detectOtherLanguage(siteConfig.language)}_flag`}>
                    {detectOtherLanguage(siteConfig.language, true)}
                  </a>
                </div>
              ) : (
                <>
                  <a href="/demoa1/login" className="showDialogD">
                    {t('_Sign In_', siteConfig.language)}
                  </a>
                  <span className="separated">|</span>
                  <a href={changeLangUrl} className={`flag ${detectOtherLanguage(siteConfig.language)}_flag`}>
                    {detectOtherLanguage(siteConfig.language, true)}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <br className="clear" />
      </div>

      {controller === 'hremployer' ? (
        <div id="nav-bar">
          <ul>
            <li className="parent">
              <a href={`${constants.JSK}/executive-search-selection`} className={`link_menu ${action === 'executive' ? 'focus' : ''}`}>
                Executive Search & Selection
              </a>
            </li>
            <li className="parent">
              <a href={`${constants.JSK}/outsourcing`} className={`link_menu ${action === 'outsourcing' ? 'focus' : ''}`}>
                Outsourcing
              </a>
            </li>
            <li className="parent">
              <a href={`${constants.JSK}/source-screen`} className={`link_menu ${action === 'source-screen' ? 'focus' : ''}`}>
                Source & Screen
              </a>
            </li>
            <li className="parent">
              <a className="link_theme jobs_emp" href={constants.JSK}>
                {t('_Jobseeker_', siteConfig.language)}
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div id="nav-bar">
          <ul>
            {arrMenuCates.map((category, index) => (
              <li 
                key={category.CATE_ID} 
                className={`parent ${index === arrMenuCates.length - 1 ? 'last' : ''}`}
                onMouseEnter={() => setIsHovered(category.CATE_ID.toString())}
                onMouseLeave={() => setIsHovered(null)}
              >
                <a 
                  href={generateUrl(category, constants)}
                  className={`link_menu ${isMenuActive(category, controller, action, newsCateParent) ? 'focus' : ''}`}
                  target={category.CATE_LINKTARGET || undefined}
                >
                  {category.CATE_NAME}
                </a>
                
                {category.CHILDREN && category.CHILDREN.length > 0 && (
                  <ul className="submenu">
                    {category.CHILDREN.map((child) => (
                      <li key={child.CATE_ID}>
                        <a 
                          href={generateUrl(child, constants)}
                          className="link_menu"
                          target={child.CATE_LINKTARGET || undefined}
                        >
                          {child.CATE_NAME}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                
                {category.CATE_TYPE === 4 && listFeatureCareer.length > 0 && (
                  <ul className="submenu">
                    {listFeatureCareer.map((feature, idx) => (
                      <li key={idx}>
                        <a href={feature.LINK} className="link_menu">
                          {feature.FEATURE_CAREER_NAME}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            
            {arrInfo && (
              <li>
                <a href={constants.LINK_RESUME} className="link_theme">
                  {t('nav_my_career', siteConfig.language)}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Why Join Dialog */}
      <div style={{ display: 'none' }}>
        <div id="WhyJoin" className="wrapDialog msgbox">
          <div className="container">
            <h3 className="col_theme">
              {t('_Join Our Talent Network_', siteConfig.language)}
            </h3>
            <div className="content_why_join">
              {t('_content_why_join_', siteConfig.language)}
              <p>
                <a href={`/join?url=${currentUrl}`} className="showDialogD">
                  <strong>{t('_Join our Talent Network today!_', siteConfig.language)}</strong>
                </a>
              </p>
            </div>
            <div className="clearall mar_top10">
              <div className="btnContinute">
                <a href={`/join?url=${currentUrl}`} className="showDialogD">
                  {t('Continute', siteConfig.language)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Join Modal */}
      <WhyJoinModal 
        isOpen={isWhyJoinOpen}
        onClose={closeWhyJoin}
        language={siteConfig.language}
      />
    </div>
  );
}
