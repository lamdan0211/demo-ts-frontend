'use client';

import React from 'react';

// Types
interface MenuCategory {
  CATE_ID: number;
  CATE_NAME: string;
  CATE_LINK: string;
  CATE_LINKTARGET?: string;
  CATE_TYPE: number;
  CATE_CODE?: string;
  SUBURL_CONTROLLER?: string;
  SUBURL_ACTION?: string;
  SUBURL_ID?: string;
  SUBURL_VALUE?: string;
  CHILDREN?: MenuCategory[];
}

interface FeatureCareer {
  FEATURE_CAREER_NAME: string;
  LINK: string;
}

interface HeaderP31Props {
  siteId?: string;
  arrEmployer?: {
    EMP_NAME: string;
  };
  arrRwInfo?: {
    RW_LOGO: string;
  };
  arrMenuCates?: MenuCategory[];
  arrInfo?: any;
  arrFunction?: {
    OFF_JOIN_TALENT_NETWORK?: boolean;
    SHOW_JOIN_TS?: number;
    SHOW_JOIN_COLLEGE?: number;
  };
  listFeatureCareer?: FeatureCareer[];
  news?: {
    CATE_PARENT: number;
  };
  controller?: string;
  action?: string;
  newlayout?: number;
  currentUrl?: string;
  CHANGE_LANG_URL?: string;
  language?: 'vi' | 'en';
  JSK?: string;
  TN?: string;
  LANGUAGE?: string;
  LINK_RW_IMAGES?: string;
  LINK_RESUME?: string;
  downloadFormLinkHeader?: string;
  downloadFormHeader?: string;
  hideLanguageFrontend?: string;
  showJoinBottom?: string;
  contentWhyJoin?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_download_form_link_header_': {
      vi: '',
      en: ''
    },
    '_download_form_header_': {
      vi: 'Tải form ứng tuyển',
      en: 'Download Application Form'
    },
    '_Change_language_': {
      vi: 'Thay đổi ngôn ngữ',
      en: 'Change Language'
    },
    'nav_my_career': {
      vi: 'Sự nghiệp của tôi',
      en: 'My Career'
    },
    'act_login': {
      vi: 'Đăng nhập',
      en: 'Login'
    },
    '_Join Our Talent Network_': {
      vi: 'Tham gia mạng lưới tài năng của chúng tôi',
      en: 'Join Our Talent Network'
    },
    '_content_why_join_': {
      vi: 'Nội dung tại sao nên tham gia...',
      en: 'Why you should join us...'
    },
    '_Join our Talent Network today!_': {
      vi: 'Tham gia mạng lưới tài năng ngay hôm nay!',
      en: 'Join our Talent Network today!'
    },
    'Continute': {
      vi: 'Tiếp tục',
      en: 'Continue'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to get menu link
function getMenuLink(category: MenuCategory, JSK: string, TN: string, LANGUAGE: string): string {
  if (category.CATE_TYPE === 2 && category.CATE_CODE) {
    return `${TN}/${category.CATE_CODE}-${category.CATE_ID.toString(16)}/${LANGUAGE}`;
  } else if (category.CATE_TYPE === 3 || (category.CATE_TYPE === 1 && 
    (category.SUBURL_ACTION === 'index,search,detail' || 
     category.SUBURL_ACTION === 'all-jobs' || 
     category.SUBURL_ACTION === 'partner'))) {
    return `${JSK}/#${category.CATE_ID}`;
  } else {
    if (category.SUBURL_ID) {
      return `${TN}${category.SUBURL_VALUE}`;
    } else {
      return category.CATE_LINK === '#' ? 'javascript:void(0)' : category.CATE_LINK;
    }
  }
}

// Helper function to get submenu link
function getSubmenuLink(category: MenuCategory, TN: string, LANGUAGE: string): string {
  if ((category.CATE_TYPE === 2 || category.CATE_TYPE === 3) && category.CATE_CODE) {
    return `${TN}/${category.CATE_CODE}-${category.CATE_ID.toString(16)}/${LANGUAGE}`;
  } else {
    if (category.SUBURL_ID) {
      return `${TN}${category.SUBURL_VALUE}`;
    } else {
      return category.CATE_LINK === '#' ? 'javascript:void(0)' : category.CATE_LINK;
    }
  }
}

// Helper function to check if menu is active
function isMenuActive(category: MenuCategory, news: any, controller: string, action: string): boolean {
  return (
    (news?.CATE_PARENT === category.CATE_ID && controller === 'news') ||
    (controller === category.SUBURL_CONTROLLER && action === category.SUBURL_ACTION) ||
    (controller === category.SUBURL_CONTROLLER && !category.SUBURL_ACTION) ||
    (controller === category.SUBURL_CONTROLLER && category.SUBURL_ACTION?.includes(action)) || false
  );
}

export default function HeaderP31({
  siteId = 'hoasen',
  arrEmployer = { EMP_NAME: 'Hoa Sen Group' },
  arrRwInfo = { RW_LOGO: 'logo.png' },
  arrMenuCates = [],
  arrInfo = null,
  arrFunction = {},
  listFeatureCareer = [],
  news = { CATE_PARENT: 0 },
  controller = 'index',
  action = 'index',
  newlayout = 0,
  currentUrl = '/hoasen',
  CHANGE_LANG_URL = '/en',
  language = 'vi',
  JSK = '/hoasen',
  TN = '/hoasen',
  LANGUAGE = 'vi',
  LINK_RW_IMAGES = `/themes/${siteId}/images`,
  LINK_RESUME = `/${siteId}/resume`,
  downloadFormLinkHeader = '',
  downloadFormHeader = '',
  hideLanguageFrontend = '',
  showJoinBottom = '',
  contentWhyJoin = ''
}: HeaderP31Props) {
  
  const showDownloadForm = downloadFormLinkHeader && downloadFormLinkHeader !== '_download_form_link_header_';
  const hideLanguage = hideLanguageFrontend && hideLanguageFrontend !== 'hide_language_frontend';
  const shouldShowJoinBottom = showJoinBottom && showJoinBottom !== '_show_join_bottom_';

  return (
    <>
      <style type="text/css">
        {`#fancybox-close{right:50px !important}`}
      </style>
      
      <div className="section-header" id="section-header">
        {/* Download Form Header */}
        {showDownloadForm && (
          <div id="my-download">
            <div className="container">
              <div className="download_form_premium">
                <a href={downloadFormLinkHeader}>{downloadFormHeader}</a>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Header */}
        <div id="header-pre">
          <div className="columns hidden">
            <div id="show-menu">
              <span className="fa fa-bars"></span>
            </div>
          </div>
          
          <div className="container">
            {/* Logo */}
            <div className="logo">
              <a href={JSK} suppressHydrationWarning={true}>
                <img 
                  alt={arrEmployer.EMP_NAME} 
                  src={arrRwInfo.RW_LOGO.startsWith('http') ? arrRwInfo.RW_LOGO : `${LINK_RW_IMAGES}/${arrRwInfo.RW_LOGO}`}
                  suppressHydrationWarning={true}
                />
              </a>
            </div>
            
            {/* Main Menu */}
            <div className="menu">
              <ul>
                {arrMenuCates.map((category) => (
                  <li 
                    key={category.CATE_ID}
                    className={`${category.CHILDREN ? 'parent' : ''} ${isMenuActive(category, news, controller, action) ? 'focus' : ''}`}
                  >
                    <a 
                      href={getMenuLink(category, JSK, TN, LANGUAGE)}
                      id={`menu_${category.CATE_ID}`}
                      target={category.CATE_LINKTARGET === '_blank' ? '_blank' : undefined}
                    >
                      {category.CATE_NAME} 
                      {category.CHILDREN && <i className="fa fa-chevron-down"></i>}
                    </a>
                    
                    {/* Submenu */}
                    {category.CHILDREN && (
                      <ul className="submenu">
                        {category.CHILDREN.map((subCategory) => (
                          <li key={subCategory.CATE_ID}>
                            <a 
                              href={getSubmenuLink(subCategory, TN, LANGUAGE)}
                              target={subCategory.CATE_LINKTARGET || undefined}
                            >
                              {subCategory.CATE_NAME}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Feature Career Submenu */}
                    {category.CATE_TYPE === 4 && listFeatureCareer.length > 0 && (
                      <ul className="submenu">
                        {listFeatureCareer.map((feature, index) => (
                          <li key={index}>
                            <a href={feature.LINK}>{feature.FEATURE_CAREER_NAME}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                
                {/* My Career Link */}
                {arrInfo && (
                  <li>
                    <a href={LINK_RESUME}>{t('nav_my_career', language)}</a>
                  </li>
                )}
              </ul>
            </div>
            
            {/* Right Navigation */}
            <div className="navbar-right">
              <ul>
                {/* Login Link */}
                {!arrInfo && !arrFunction.OFF_JOIN_TALENT_NETWORK && (
                  <li>
                    <a 
                      href="/hoasen/login"
                      className={newlayout === 1 ? '' : 'showDialogD'}
                      onClick={newlayout === 1 ? () => {
                        if (typeof window !== 'undefined') {
                          (window as any).openDialog('/hoasen/login', 1);
                        }
                      } : undefined}
                    >
                      {t('act_login', language)}
                    </a>
                  </li>
                )}
                
                {/* Language Change */}
                {!hideLanguage && (
                  <li>
                    <span className={LANGUAGE === 'vi' ? 'en' : 'vi'}></span>
                    <a href={CHANGE_LANG_URL}>{t('_Change_language_', language)}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Dialog */}
      <div style={{ display: 'none' }}>
        <div id="WhyJoin" className="wrapDialog msgbox">
          <div className="container">
            <h3 className="col_theme">{t('_Join Our Talent Network_', language)}</h3>
            <div className="content_why_join">
              {contentWhyJoin || t('_content_why_join_', language)}
              {arrFunction.SHOW_JOIN_TS === 0 && arrFunction.SHOW_JOIN_COLLEGE === 1 ? (
                <p>
                  <a href={`/hoasen/joincollege?url=${currentUrl}`}>
                    <strong>{t('_Join our Talent Network today!_', language)}</strong>
                  </a>
                </p>
              ) : (
                <p>
                  <a href={`/hoasen/join?url=${currentUrl}`} className="showDialogD">
                    <strong>{t('_Join our Talent Network today!_', language)}</strong>
                  </a>
                </p>
              )}
            </div>
            <div className="clearall mar_top10">
              {arrFunction.SHOW_JOIN_TS === 0 && arrFunction.SHOW_JOIN_COLLEGE === 1 ? (
                <div className="btnContinute">
                  <a href={`/hoasen/joincollege?url=${currentUrl}`}>{t('Continute', language)}</a>
                </div>
              ) : (
                <div className="btnContinute">
                  <a href={`/hoasen/join?url=${currentUrl}`} className="showDialogD">{t('Continute', language)}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}