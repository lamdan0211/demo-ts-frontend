'use client';

import React from 'react';
import Head from 'next/head';

interface LayoutPremiumProps {
  children: React.ReactNode;
  siteId?: string;
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
    TEMPLATEDEFAULT_ID: string;
    RW_FILETYPE_SUPPORT: string;
    RW_GOOGLEDRIVE_CLIENT_ID?: string;
    RW_DROPBOX_KEY?: string;
    RW_GOOGLE_SCRIPT?: string;
    RW_FACEBOOK_SCRIPT?: string;
  };
  arrMetaTag?: {
    title: string;
    description: string;
    keywords: string;
  };
  arrFunction?: {
    SUPPORT_MOBILE: boolean;
  };
  controller?: string;
  action?: string;
  newlayout?: number;
  arrInfo?: any;
  arrSupportedLanguages?: string[];
  arrMenuCates?: any[];
  CHANGE_LANG_URL?: string;
  arrIndustries?: any[];
  arrLocations?: any[];
  debugMessage?: string;
  popup_success?: boolean;
  langding_page?: number;
  css_custom?: number;
  js_custom?: number;
  notViewIE?: number;
  arrRWApiConfig?: any;
  application?: any;
  is_mobile?: boolean;
  headLink?: any;
  headScript?: any;
  headStyle?: any;
  imageShare?: {
    file?: string;
    width?: number;
    height?: number;
  };
  amphtml_url?: string;
  googleAppId?: string;
  transactionId?: string;
  arrJobInfo?: any;
  hexId?: string;
  transIndustry?: string;
  transLocation?: string;
  transCountry?: string;
  isApplyJob?: string;
  objTrans?: { 
    translations: { [key: string]: string };
  };
  flagBootrap?: number;
}

// Global variables that would come from PHP constants
const GLOBAL_CONFIG = {
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
  TN: process.env.NEXT_PUBLIC_TN || '/demoa1',
  EMP_TN: process.env.NEXT_PUBLIC_EMP_TN || '/employers',
  LANGUAGE: process.env.NEXT_PUBLIC_LANGUAGE || 'en',
  OWNER: process.env.NEXT_PUBLIC_OWNER || 'demoa1',
  IMAGES_TN: process.env.NEXT_PUBLIC_IMAGES_TN || '/images',
  STATIC_TN: process.env.NEXT_PUBLIC_STATIC_TN || '/static',
  FILESUPPORT: process.env.NEXT_PUBLIC_FILESUPPORT || 'pdf,doc,docx',
  EMP_NAME: process.env.NEXT_PUBLIC_EMP_NAME || 'Job Portal',
  LINK_FORGOT: process.env.NEXT_PUBLIC_LINK_FORGOT || '/forgot-password',
  STATIC_TN_V1: process.env.NEXT_PUBLIC_STATIC_TN_V1 || '/static-v1',
};

export default function LayoutPremium({
  children,
  siteId = 'demoa1',
  title = 'Job Portal - Find Your Dream Job',
  description = 'Find management and executive level jobs. Join our talent network today!',
  keywords = 'jobs, careers, employment, talent network, management, executive',
  ogImage,
  ogImageWidth = 200,
  ogImageHeight = 200,
  currentUrl = '',
  arrEmployer = { 
    EMP_NAME: 'Job Portal', 
    RW_LOGO: 'logo.png',
    TEMPLATEDEFAULT_ID: 'P21',
    RW_FILETYPE_SUPPORT: 'pdf,doc,docx'
  },
  arrMetaTag = { title: 'Job Portal', description: 'Find jobs', keywords: 'jobs' },
  arrFunction = { SUPPORT_MOBILE: true },
  controller = 'index',
  action = 'index',
  newlayout = 0,
  arrInfo = null,
  arrSupportedLanguages = ['en', 'vi'],
  arrMenuCates = [],
  CHANGE_LANG_URL = '/en',
  arrIndustries = [],
  arrLocations = [],
  debugMessage = '',
  popup_success = false,
  langding_page = 1,
  css_custom = 0,
  js_custom = 0,
  notViewIE = 0,
  arrRWApiConfig = {},
  application = null,
  is_mobile = false,
  headLink = null,
  headScript = null,
  headStyle = null,
  imageShare = {},
  amphtml_url = '',
  googleAppId = '',
  transactionId = '',
  arrJobInfo = {},
  hexId = '',
  transIndustry = '',
  transLocation = '',
  transCountry = '',
  isApplyJob = '',
  objTrans = { translations: {} },
  flagBootrap = 0,
}: LayoutPremiumProps) {
  // Translation helper function
  const t = (key: string) => objTrans.translations[key] || key;
  const strLogo = `/themes/${siteId}/images/${arrEmployer?.RW_LOGO || 'logo.png'}`;
  const finalTitle = arrMetaTag?.title || title;
  const finalDescription = arrMetaTag?.description || description;
  const finalKeywords = arrMetaTag?.keywords || keywords;
  const finalOgImage = ogImage || `${GLOBAL_CONFIG.TN}/sharefb?file=${imageShare.file || strLogo}`;

  // Determine if Bootstrap should be used
  const shouldUseBootstrap = flagBootrap === 1 || (
    (controller === 'index' && ['index', 'partner', 'video', 'registercollege'].includes(action)) ||
    (controller === 'jobs' && ['search', 'detail', 'all-jobs'].includes(action)) ||
    (controller === 'news' && ['index', 'detail'].includes(action)) ||
    (controller === 'testimonial' && action === 'index') ||
    controller === 'resume'
  );

  // Body class based on controller and action
  const getBodyClass = () => {
    let bodyClass = '';
    
    if (controller === 'index' && action === 'registercollege') {
      bodyClass = 'newsclass_detail join-college';
    } else {
      bodyClass = `${controller}_${action}`;
    }
    
    if (!shouldUseBootstrap) {
      bodyClass += ' no-bootstrap';
    }
    
    return bodyClass;
  };

  return (
    <>
      {/* Head content will be handled by Next.js root layout */}
        <meta httpEquiv="Content-language" content={GLOBAL_CONFIG.LANGUAGE} />
        {currentUrl && <link href={currentUrl} hrefLang={GLOBAL_CONFIG.LANGUAGE} rel="alternate" />}
        {CHANGE_LANG_URL && GLOBAL_CONFIG.LANGUAGE !== CHANGE_LANG_URL && (
          <link href={CHANGE_LANG_URL} hrefLang={GLOBAL_CONFIG.LANGUAGE === 'vi' ? 'en' : 'vi'} rel="alternate" />
        )}
        {/* <base href={`${GLOBAL_CONFIG.STATIC_TN}${arrEmployer?.TEMPLATEDEFAULT_ID || 'P21'}/`} /> */}
        
        {/* Favicon */}
        <link rel="icon" href={`${GLOBAL_CONFIG.STATIC_TN}/favicon_${GLOBAL_CONFIG.OWNER}.ico?t=1`} />
        
        {/* Meta Tags */}
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="robots" content="index,follow" />
        <title>{finalTitle}</title>
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={arrEmployer?.EMP_NAME || 'Job Portal'} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:width" content={String(ogImageWidth)} />
        <meta property="og:image:height" content={String(ogImageHeight)} />
        <meta property="og:description" content={finalDescription} />
        
        {/* Head Links and Scripts */}
        {headLink}
        {headScript}
        
        {/* Keywords and Description */}
        <meta name="keywords" content={finalKeywords} />
        <meta name="description" content={finalDescription} />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
        
        {/* Bootstrap CSS */}
        {shouldUseBootstrap && (
          <>
            {/* Temporarily commented out P21 template support - removed due to syntax errors */}
            
            {/* Default template support */}
            <link href="/themes/css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
            {/*[if lt IE 9]*/}
            <link href="/themes/css/iefix.css" rel="stylesheet" type="text/css" />
            <script src="/themes/js/html5shiv.min.js" />
            <script src="/themes/js/respond.min.js" />
            {/*[endif]*/}
            
            {/* Bootstrap-specific styles */}
            <style dangerouslySetInnerHTML={{
              __html: `
                .wrapDialog .container { width: 100% }
                .jc-bs3-container, .jc-bs3-row {width:100% !important}
                .jconfirm-content{line-height: 22px}
              `
            }} />
          </>
        )}
        
        {/* Register page specific styles */}
        {controller === 'index' && action === 'register' && (
          <style dangerouslySetInnerHTML={{
            __html: `
              .jc-bs3-container, .jc-bs3-row {width:100% !important}
              .jconfirm-box-container {width: 60%;float:left;margin-left: 20.333%;}
            `
          }} />
        )}
        
        {/* CSS Variables */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              ${t('height_top_banner') && t('height_top_banner') !== 'height_top_banner' ? 
                `--HeightTopBanner: ${t('height_top_banner')}px;` : ''}
              ${t('height_mid_banner') && t('height_mid_banner') !== 'height_mid_banner' ? 
                `--HeightMidBanner: ${t('height_mid_banner')}px;` : ''}
              ${t('padding_top_banner') && t('padding_top_banner') !== 'padding_top_banner' ? 
                `--PaddingTopBanner: ${t('padding_top_banner')};` : ''}
            }
          `
        }} />
        
        {/* CSS Imports */}
        <link href="/themes/css/general.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="/themes/css/FontAwesome.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="/themes/css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
        {newlayout !== 1 && (
          <link href="/themes/css/core.css?t=20171010" rel="stylesheet" type="text/css" media="screen" />
        )}
        <link href="/themes/css/theme_default.css" rel="stylesheet" type="text/css" media="screen" />
        {arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'resume', 'profile'].includes(controller) && (
          <>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link href="/themes/css/TNredirect.css" rel="stylesheet" type="text/css" media="screen" />
          </>
        )}
        <link href="/themes/templateP31/css/premium.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="/themes/hoasen/css/themes.css" rel="stylesheet" type="text/css" media="screen" />
        {/* <link href="/themes/hoasen/css/homepage-p13.css" rel="stylesheet" type="text/css" media="screen" /> */}
        {GLOBAL_CONFIG.LANGUAGE === 'vi' && (
          <link rel="stylesheet" type="text/css" href="/themes/hoasen/css/nav_vi.css?t=12032015" media="screen" />
        )}
        <link href="/themes/js/jquery_ui/jquery.multiselect.css" rel="stylesheet" type="text/css" />
        <link href="/themes/js/jquery_ui/themes/ui-lightness/jquery-ui.css" rel="stylesheet" type="text/css" />
        {newlayout !== 1 && (
          <link href="/themes/css/fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
        )}
        <link href="/themes/css/jquery-confirm.min.css" rel="stylesheet" type="text/css" />
        <link href="/themes/js/chosen/chosen.css" rel="stylesheet" type="text/css" />
        
        {/* JavaScript Libraries */}
        {newlayout === 1 && ['resume', 'profile'].includes(controller) && action === 'apply' && (
          <script src="/themes/js/jquery.min.js" />
        )}
        {newlayout !== 1 && (
          <>
            <script src="/themes/js/jquery_ui/jquery-ui.min.js" />
            <script src="/themes/js/jquery_ui/jquery.multiselect.js" />
          </>
        )}
        <script src="/themes/js/jquery.formatcurrency.js" />
        <script src="/themes/js/jquery-confirm.min.js" />
        <script src="/themes/js/lazyload.js" />
        <script src="/themes/js/hoverIntent.js" />
        
        {/* Global JavaScript Variables */}
        <script dangerouslySetInnerHTML={{
          __html: `
            var DOMAIN = '${GLOBAL_CONFIG.DOMAIN}';
            var TN = '${GLOBAL_CONFIG.TN}';
            ${newlayout !== 1 ? `var CKEDITOR_BASEPATH = '${GLOBAL_CONFIG.STATIC_TN}/js/ckeditor/';` : ''}
            var EMP_TN = '${GLOBAL_CONFIG.EMP_TN}';
            var LANGUAGE = '${GLOBAL_CONFIG.LANGUAGE}';
            var OWNER = '${GLOBAL_CONFIG.OWNER}';
            var IMAGES_TN = '${GLOBAL_CONFIG.IMAGES_TN}';
            var STATIC_TN = '${GLOBAL_CONFIG.STATIC_TN}';
            var FILESUPPORT = '${arrEmployer?.RW_FILETYPE_SUPPORT || ''}';
            var Controller = '${controller}';
            var Action = '${action}';
            var Layout_Template = '${arrEmployer?.TEMPLATEDEFAULT_ID || 'P21'}';
            var EMP_NAME = '${arrEmployer?.EMP_NAME || 'Job Portal'}';
            var LINK_FORGOT = '${GLOBAL_CONFIG.LINK_FORGOT}';
            
            function checkIos() {
              return /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
            }
            
            function windowsPhone() {
              return /windows phone/i.test(navigator.userAgent);
            }
          `
        }} />
        
        {/* Initialization Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            $(document).ready(function() {
              $(".lazyload").lazyload();
              var flagCheckBlacklist = getCookie('email_blacklist');
              if(flagCheckBlacklist == 1) {
                if (${arrInfo ? 'true' : 'false'}) {
                  $.confirm({
                    title: '',
                    content: language.msg_email_blacklist,
                    buttons: {
                      confirm: {
                        text: language.edit_email,
                        action: function () {
                          location.href = TN + '/' + LANGUAGE + '/' + 'profile/update#email';
                        }
                      },
                      cancelAction: {
                        text: language.msg_cancel,
                        action: function () {}
                      }
                    }
                  });
                  setCookie('email_blacklist', 0, 5 * 60);
                }
              }
            });
          `
        }} />
        
        {/* Google Drive Integration */}
        {notViewIE === 0 && arrEmployer?.RW_GOOGLEDRIVE_CLIENT_ID && ['rod', 'demo', 'demo1', 'demo2', 'tonducthang', 'premium', 'demo5', 'demo6'].includes(GLOBAL_CONFIG.OWNER) && (
          <>
            <script dangerouslySetInnerHTML={{
              __html: `
                var googledrive_client_id = "${arrEmployer?.RW_GOOGLEDRIVE_CLIENT_ID}";
                var googledrive_client_app_id = "${googleAppId}";
                $(window).on("load", function() {
                  $("[id*=oauth2relay]").css({'position':'unset','width':'','height':'0','border':'0'});
                });
              `
            }} />
            <script src={`https://www.google.com/jsapi?key=${arrEmployer?.RW_GOOGLEDRIVE_CLIENT_ID}`} type="text/javascript" />
            <script src={`${GLOBAL_CONFIG.STATIC_TN}/js/googleresumeapply.js?t=20150806`} type="text/javascript" />
            <script src="https://apis.google.com/js/client.js?onload=handleClientLoad" type="text/javascript" />
          </>
        )}
        
        {/* Dropbox Integration */}
        {notViewIE === 0 && arrEmployer?.RW_DROPBOX_KEY && (
          <script src="https://www.dropbox.com/static/api/2/dropins.js" data-app-key={arrEmployer?.RW_DROPBOX_KEY} id="dropboxjs" />
        )}
        
        {/* Google Analytics for Job Apply */}
        {controller === 'jobs' && action === 'apply' && isApplyJob && (
          <script dangerouslySetInnerHTML={{
            __html: `
              dataLayer = [{
                'transactionId': '${transactionId}',
                'transactionAffiliation': '${GLOBAL_CONFIG.OWNER}',
                'transactionTotal': 0,
                'transactionShipping': 0,
                'transactionTax': 0,
                'transactionProducts': [{'name': '${arrJobInfo.JOB_TITLE}', 'sku': '${hexId}', 'category': '${transIndustry}', 'price': 0, 'quantity': 1}],
                'transactionCity': '${transLocation}',
                'transactionCountry': '${transCountry}'
              }];
            `
          }} />
        )}
        
        {/* Additional Head Content */}
        {headStyle}
        
        {/* Google Analytics */}
        {arrEmployer?.RW_GOOGLE_SCRIPT ? (
          <div dangerouslySetInnerHTML={{ __html: arrEmployer.RW_GOOGLE_SCRIPT }} />
        ) : (
          <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        )}
      {/* End of head content */}
      <div className={getBodyClass()}>
        {/* Facebook Script */}
        {arrEmployer?.RW_FACEBOOK_SCRIPT && (
          <div dangerouslySetInnerHTML={{ __html: arrEmployer.RW_FACEBOOK_SCRIPT }} />
        )}
        
        {/* Mobile Menu Premium */}
        <div id="mobile-menu-premium" style={{ display: 'none' }}>
          {/* Mobile menu content would go here */}
        </div>
        
        {/* Main Content */}
        {shouldUseBootstrap ? (
          <>
            {/* Header */}
            <div id="header">
              {/* Header content would be included here */}
            </div>
            
            {/* Wrapper */}
            {newlayout === 1 && ['resume', 'profile'].includes(controller) && action === 'apply' ? (
              <div id="wrapper">
                <div className="page-content" id="page-content">
                  {['resume', 'profile'].includes(controller) && (
                    <div id="sidebar">
                      {/* Sidebar content */}
                    </div>
                  )}
                  <div className="content-wrap">
                    {children}
                  </div>
                </div>
              </div>
            ) : (
              <div id="wrapper">
                {children}
              </div>
            )}
            
            {/* Footer */}
            <div id="footer">
              {/* Footer content would be included here */}
            </div>
          </>
        ) : (
          <div id="container" className={`${controller === 'news' && action === 'employer' ? 'home_employer' : ''} ${arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'hremployer'].includes(controller) ? 'frontmobile' : ''} ${['profile', 'resume'].includes(controller) ? 'fontCoreJobseeker' : ''}`}>
            {/* Header */}
            <div id="header">
              {/* Header content would be included here */}
            </div>
            
            {/* Wrapper */}
            {newlayout === 1 && ['resume', 'profile'].includes(controller) && action === 'apply' ? (
              <div id="wrapper">
                <div className="page-content" id="page-content">
                  {['resume', 'profile'].includes(controller) && (
                    <div id="sidebar">
                      {/* Sidebar content */}
                    </div>
                  )}
                  <div className="content-wrap">
                    {children}
                  </div>
                </div>
              </div>
            ) : (
              <div id="wrapper">
                {arrEmployer?.TEMPLATEDEFAULT_ID === 'P21' ? (
                  <div className="main-container">{children}</div>
                ) : (
                  children
                )}
              </div>
            )}
            
            {/* Footer */}
            <div id="footer">
              {/* Footer content would be included here */}
            </div>
          </div>
        )}
        
        {/* Back to Top Button */}
        <div id="back-top" className="" style={{ display: 'none' }}>
          <a className="bgcolor_theme" id="topToPage" href="javascript:void(0);">Top</a>
        </div>
        
        {/* Notice Popup */}
        <div style={{ display: 'none' }}>
          <div id="NoticePost" className="msgbox">
            <div className="msg_content">
              <div className="i_alert"></div>
              <h2 id="notice_title"></h2>
              <div id="notice_desc"></div>
              <div className="clear cp">
                <input id="notice_ok" type="button" value="Ok" className="fl_left ui_btnCb" />
                <input id="notice_cancel" type="button" value="Cancel" className="ui_btnCb" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Popup */}
        {popup_success && (
          <div id="popup_success">
            <div className="msgbox">
              <div className="msg_content">
                <div className="i_success"></div>
                <h2>Success!</h2>
                <div>Your action was completed successfully.</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Additional Scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof checkMobile !== 'undefined') {
              if (checkMobile()) {
                ${controller === 'jobs' && action === 'detail' ? `
                  $("#header-join").hide();
                  $("#search-container").hide();
                ` : ''}
              }
            }
            
            var arrCates = new Array();
            ${arrIndustries.map(R => `arrCates[${R.INDUSTRY_ID}] = '${R.INDUSTRY_NAME}';`).join('')}
            
            var arrLocs = new Array();
            ${arrLocations.map(R => `arrLocs[${R.LOCATION_ID}] = '${R.LOCATION_NAME}';`).join('')}
            
            function validateSearch(form) {
              if($('input[name="q"]').val() === 'Keyword') {
                $('input[name="q"]').val('');
              }
              var keyword = createKeyword($('input[name="q"]').val()),
                  category = parseInt($('select[name="cat"]').val()),
                  location = parseInt($('select[name="loc"]').val()),
                  prep = new Array('en', 'vi');
              prep['en'] = new Array('category', 'at');
              prep['vi'] = new Array('nganh', 'tai');
              if(LANGUAGE !== 'vi' && LANGUAGE !== 'en') prep[LANGUAGE] = prep['en'];
              
              if(!keyword && !category && !location) {
                searchLink = '${GLOBAL_CONFIG.TN}/jobs';
              } else {
                searchLink = '${GLOBAL_CONFIG.TN}/jobs/search';
                if(keyword !== '') {
                  searchLink += '/' + keyword;
                }
                if(keyword && category) {
                  searchLink += '/' + prep[LANGUAGE][0] + '-' + createKeyword(stripVietnamese(arrCates[category])) + '.' + category;
                } else if(category) {
                  searchLink += '/' + createKeyword(stripVietnamese(arrCates[category])) + '.' + category;
                }
                if(location) {
                  searchLink += '/' + prep[LANGUAGE][1] + '-' + createKeyword(stripVietnamese(arrLocs[location])) + '.' + location;
                }
                searchLink += '/' + LANGUAGE;
              }
              window.location = searchLink;
              return false;
            }
          `
        }} />
        
        {/* Additional Scripts */}
        {newlayout !== 1 && (
          <script src="/themes/js/fancybox/jquery.fancybox-1.3.4.js" />
        )}
        <script src="/themes/js/jquery.validate.js" />
        <script src="/themes/js/additional-methods.js" />
        <script src="/themes/js/tn-validate-methods.js" />
        <script src="/themes/js/common.js?t=2" />
        <script src="/themes/js/common_premium.js?v=10" />
        
        {/* Custom CSS and JS */}
        {css_custom === 1 && (
          <link href="custom/css_custom.css" rel="stylesheet" type="text/css" media="screen" />
        )}
        {js_custom === 1 && (
          <script src="custom/js_custom.js" />
        )}
        
        {/* New Layout Scripts */}
        {newlayout === 1 && ['resume', 'profile'].includes(controller) && action === 'apply' && (
          <script dangerouslySetInnerHTML={{
            __html: `
              $(document).ready(function() {
                $('#default-sidebar').css('top', $('#section-header').height());
                $('#footer').css({
                  'position': 'relative',
                  'z-index': 1
                });
                $('#section-header').css('position', 'fixed');
                $('#page-content').css('padding-top', $('#section-header').height());
              });
            `
          }} />
        )}
        
        {/* Template-specific styles */}
        {arrEmployer?.TEMPLATEDEFAULT_ID === 'P21' && (
          <style dangerouslySetInnerHTML={{
            __html: `
              .header {
                width: calc(100%) !important;
                left: 0px;
              }
            `
          }} />
        )}
      </div>
    </>
  );
}
