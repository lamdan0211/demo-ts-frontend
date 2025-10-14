'use client';

import React, { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { WhyJoinModal } from '@/components/UI';

interface HeaderProps {
  siteId?: string;
  arrRwInfo?: {
    RW_LOGO: string;
  };
  arrEmployer?: {
    EMP_NAME: string;
    RW_LOGO: string;
  };
  arrInfo?: any;
  arrFunction?: {
    OFF_JOIN_TALENT_NETWORK?: boolean;
  };
  arrMenuCates?: any[];
  listFeatureCareer?: any[];
  news?: {
    CATE_PARENT: number;
  };
  controller?: string;
  action?: string;
  currentUrl?: string;
  CHANGE_LANG_URL?: string;
  language?: string;
  JSK?: string;
  TN?: string;
  LANGUAGE?: string;
  LINK_RW_IMAGES?: string;
  LINK_RESUME?: string;
}

// Translation function
function t(key: string, language: string = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    '_By Employer_': {
      vi: 'Được tạo bởi Nhà tuyển dụng',
      en: 'Created by Employer'
    },
    '_Stay Connected_': {
      vi: 'Kết nối với chúng tôi',
      en: 'Stay Connected'
    },
    'Why?': {
      vi: 'Tại sao?',
      en: 'Why?'
    },
    'title_join_our_tn': {
      vi: 'Tham gia mạng lưới tài năng',
      en: 'Join Our Talent Network'
    },
    'act_login': {
      vi: 'Đăng nhập',
      en: 'Login'
    },
    'act_hello': {
      vi: 'Xin chào',
      en: 'Hello'
    },
    'nav_my_career': {
      vi: 'Sự nghiệp của tôi',
      en: 'My Career'
    },
    'act_logout': {
      vi: 'Đăng xuất',
      en: 'Logout'
    },
    '_Join Our Talent Network_': {
      vi: 'Tham gia mạng lưới tài năng',
      en: 'Join Our Talent Network'
    },
    '_content_why_join_': {
      vi: 'Tham gia mạng lưới tài năng để có cơ hội việc làm tốt nhất.',
      en: 'Join our talent network to get access to the best job opportunities.'
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

// Helper function to detect other language
function detectOtherLanguage(language: string, returnName: boolean = false): string {
  if (returnName) {
    return language === 'en' ? 'Vietnamese' : 'English';
  }
  return language === 'en' ? 'vi' : 'en';
}

// Helper function to generate links
function getLink(type: string, params: any): string {
  switch (type) {
    case 'join':
      return `/demoa2/join?url=${params.currentUrl || ''}`;
    case 'login':
      return '/demoa2/login';
    case 'logout':
      return '/demoa2/logout';
    default:
      return '#';
  }
}

export default function Header({
  siteId = 'demoa2',
  arrRwInfo = { RW_LOGO: 'logo.png' },
  arrEmployer = { EMP_NAME: 'Demo A2', RW_LOGO: 'logo.png' },
  arrInfo = null,
  arrFunction = { OFF_JOIN_TALENT_NETWORK: false },
  arrMenuCates = [],
  listFeatureCareer = [],
  news = { CATE_PARENT: 0 },
  controller = 'index',
  action = 'index',
  currentUrl = '/demoa2',
  CHANGE_LANG_URL = '/demoa2?lang=vi',
  language = 'en',
  JSK = '/demoa2',
  TN = '/demoa2',
  LANGUAGE = 'en',
  LINK_RW_IMAGES = '/themes/demoa2/images',
  LINK_RESUME = '/demoa2/resume'
}: HeaderProps) {
  // State for submenu hover - React way
  const [hoveredMenuId, setHoveredMenuId] = useState<number | null>(null);
  const { isOpen: isWhyJoinOpen, openModal: openWhyJoin, closeModal: closeWhyJoin } = useModal();
  
  const strLogo = `${LINK_RW_IMAGES}/${arrRwInfo?.RW_LOGO || 'logo.png'}`;
  const otherLanguage = detectOtherLanguage(language);
  const otherLanguageName = detectOtherLanguage(language, true);

  // Mobile detection function
  const checkMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Check if menu item is active
  const isMenuActive = (menuItem: any) => {
    if (news.CATE_PARENT === menuItem.CATE_ID && controller === 'news') return true;
    if (controller === menuItem.SUBURL_CONTROLLER && action === menuItem.SUBURL_ACTION) return true;
    if (controller === menuItem.SUBURL_CONTROLLER && !menuItem.SUBURL_ACTION) return true;
    if (controller === menuItem.SUBURL_CONTROLLER && menuItem.SUBURL_ACTION && 
        menuItem.SUBURL_ACTION.split(',').includes(action)) return true;
    return false;
  };

  // Generate menu link
  const getMenuLink = (menuItem: any) => {
    if ((menuItem.CATE_TYPE === 2 || menuItem.CATE_TYPE === 3) && menuItem.CATE_CODE) {
      return `${TN}/${menuItem.CATE_CODE}-${menuItem.CATE_ID.toString(16)}/${LANGUAGE}`;
    }
    
    if (menuItem.SUBURL_ID) {
      return `${TN}${menuItem.SUBURL_VALUE}`;
    }
    
    if (menuItem.CATE_LINK === '#') {
      return '#';
    }
    
    return menuItem.CATE_LINK || '#';
  };

  return (
    <div id="header-container" className="headerfront" suppressHydrationWarning={true}>
      <div id="header">
        <div id="logo">
          {arrRwInfo && (
            <a href={TN} target="_blank" suppressHydrationWarning={true}>
              <img alt={arrEmployer?.EMP_NAME} src={strLogo} suppressHydrationWarning={true} />
            </a>
          )}
        </div>
        
        {!arrInfo ? (
          <div id="header-join-container">
            <div id="lang">
              <a href={CHANGE_LANG_URL} className={`flag ${otherLanguage}_flag`}>
                {otherLanguageName}
              </a>
            </div>
            
            {!arrFunction.OFF_JOIN_TALENT_NETWORK && (
              <div id="header-join">
                <a href={getLink('join', { currentUrl })} className="buttonJoin showDialogD">
                  {t('title_join_our_tn', language)}
                </a>
                <p className="col_theme stayconnect">
                  {t('_Stay Connected_', language)}. 
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
                    {t('Why?', language)}
                  </button>
                </p>
              </div>
            )}
            <br className="clear" />
            
            {!arrFunction.OFF_JOIN_TALENT_NETWORK && (
              <div className="logina">
                <a href={getLink('login', {})} className="showDialogD link_theme">
                  {t('act_login', language)}
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="logined" id="header-join-container">
            <div className="joinarea">
              <div id="lang">
                <a href={CHANGE_LANG_URL} className={`flag ${otherLanguage}_flag`}>
                  {otherLanguageName}
                </a>
              </div>
            </div>
            
            <ul className="nav">
              <li className="userjoin">
                {t('act_hello', language)} {arrInfo.JOBSEEKER_FIRSTNAME},
              </li>
              <li className="posRelative">
                <a href={LINK_RESUME} className="link_theme">
                  {t('nav_my_career', language)}
                </a>
              </li>
              <li className="end">
                <a href={getLink('logout', {})} className="link_theme">
                  {t('act_logout', language)}
                </a>
              </li>
            </ul>
            <br className="clear" />
          </div>
        )}
      </div>
      
      <div id="nav-bar">
        <ul>
          {arrMenuCates.map((menuItem, index) => (
            <li 
              key={menuItem.CATE_ID} 
              className={`parent${index === arrMenuCates.length - 1 ? ' last' : ''} ${hoveredMenuId === menuItem.CATE_ID ? 'over' : ''}`}
              onMouseEnter={() => (menuItem.CHILDREN || (menuItem.CATE_TYPE === 4 && listFeatureCareer)) && setHoveredMenuId(menuItem.CATE_ID)}
              onMouseLeave={() => setHoveredMenuId(null)}
            >
              <a 
                href={getMenuLink(menuItem)}
                className={`link_menu ${isMenuActive(menuItem) ? 'focus' : ''}`}
                target={menuItem.CATE_LINKTARGET || undefined}
              >
                {menuItem.CATE_NAME}
              </a>
              
              {/* Submenu for children */}
              {menuItem.CHILDREN && menuItem.CHILDREN.length > 0 && (
                <ul 
                  className="submenu"
                  style={{ 
                    display: hoveredMenuId === menuItem.CATE_ID ? 'block' : 'none'
                  }}
                >
                  {menuItem.CHILDREN.map((child: any) => (
                    <li key={child.CATE_ID}>
                      <a 
                        href={getMenuLink(child)}
                        className="link_menu"
                        target={child.CATE_LINKTARGET || undefined}
                      >
                        {child.CATE_NAME}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              
              {/* Submenu for feature career */}
              {menuItem.CATE_TYPE === 4 && listFeatureCareer && listFeatureCareer.length > 0 && (
                <ul 
                  className="submenu"
                  style={{ 
                    display: hoveredMenuId === menuItem.CATE_ID ? 'block' : 'none'
                  }}
                >
                  {listFeatureCareer.map((feature: any, featureIndex: number) => (
                    <li key={featureIndex}>
                      <a href={feature.LINK} className="link_menu">
                        {feature.FEATURE_CAREER_NAME}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Why Join Modal */}
      <WhyJoinModal 
        isOpen={isWhyJoinOpen}
        onClose={closeWhyJoin}
        language={language}
      />
    </div>
  );
}
