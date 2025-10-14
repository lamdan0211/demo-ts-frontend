'use client';

import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  siteId?: string;
  owner?: string;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  currentUrl?: string;
  arrEmployer?: {
    EMP_NAME: string;
    RW_LOGO: string;
  } | null;
  arrMetaTag?: {
    title?: string;
    description?: string;
    keywords?: string;
  } | null;
  controller?: string;
  action?: string;
  newlayout?: number;
  arrFunction?: {
    SUPPORT_MOBILE: boolean;
  };
  arrSupportedLanguages?: string[];
  CHANGE_LANG_URL?: string;
  arrInfo?: any;
  language?: string;
}

// Translation function
function t(key: string, language: string = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Login_': {
      vi: 'Đăng nhập',
      en: 'Login'
    },
    '_Join Now_': {
      vi: 'Tham gia ngay',
      en: 'Join Now'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function Layout({
  children,
  siteId = 'demoa1',
  owner = 'demoa1',
  title = 'Job Portal',
  description = 'Find management and executive level jobs',
  keywords = 'jobs, careers, employment',
  ogImage = '/themes/demoa1/images/open_graph.jpg',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  currentUrl = '/',
  arrEmployer = {
    EMP_NAME: 'Job Portal',
    RW_LOGO: 'logo.png'
  },
  arrMetaTag = null,
  controller = 'index',
  action = 'index',
  newlayout = 0,
  arrFunction = { SUPPORT_MOBILE: true },
  arrSupportedLanguages = ['en', 'vi'],
  CHANGE_LANG_URL = '/en',
  arrInfo = null,
  language = 'vi'
}: LayoutProps) {
  const finalTitle = arrMetaTag?.title || title;
  const finalDescription = arrMetaTag?.description || description;
  const finalKeywords = arrMetaTag?.keywords || keywords;
  const strLogo = `/themes/${siteId}/images/${arrEmployer?.RW_LOGO}`;

  return (
    <>
      <Head>
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={finalKeywords} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {['demoa2', 'demoa1'].includes(siteId) && (
        <link href="/themes/css/bootstrap.css" rel="stylesheet" type="text/css" />
      )}
      <link href="/themes/css/general.css" rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/css/FontAwesome.css" rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/css/core.css" rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/css/theme_default.css" rel="stylesheet" type="text/css" media="screen" />
      <link href={`/themes/${siteId}/css/themes.css`} rel="stylesheet" type="text/css" media="screen" />
      <link href={`/themes/${siteId}/${owner}/skin.css`} rel="stylesheet" type="text/css" media="screen" />
      {/* Legacy CSS links removed */}
      
      
      <div className={`site-${siteId}`} suppressHydrationWarning={true}>
        {/* Header */}
        <div id="section-header">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div id="header-pre" suppressHydrationWarning={true}>
                  <div className="logo">
                    <a href="/">
                      <img src={strLogo} alt={arrEmployer?.EMP_NAME} />
                    </a>
          </div>
                  <div className="navbar-right">
                    <a href="/login">{t('_Login_', language)}</a>
                    <a href="/join">{t('_Join Now_', language)}</a>
        </div>
        </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div id="wrapper">
          {children}
        </div>

        {/* Footer */}
        <div id="footer">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <p>&copy; 2024 {arrEmployer?.EMP_NAME}. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}