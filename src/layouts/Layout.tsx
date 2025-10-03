'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
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
    RW_GOOGLEDRIVE_CLIENT_ID?: string;
    TEMP_NAME?: string;
    [key: string]: any;
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

export default function Layout({
  children,
  title = 'Job Portal - Find Your Dream Job',
  description = 'Find management and executive level jobs. Join our talent network today!',
  keywords = 'jobs, careers, employment, talent network, management, executive',
  ogImage,
  ogImageWidth = 200,
  ogImageHeight = 200,
  currentUrl = '',
  arrEmployer = { EMP_NAME: 'Job Portal', RW_LOGO: 'logo.png' },
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
}: LayoutProps) {
  // Handle browser extension attributes that cause hydration mismatch
  useEffect(() => {
    // Remove attributes added by browser extensions
    const body = document.body;
    if (body) {
      // Remove common extension attributes
      body.removeAttribute('_processed_bb29d08c-62eb-4d4a-8749-26a66bf19acc_');
      body.removeAttribute('bis_register');
      
      // Remove any other extension attributes
      const attributes = body.attributes;
      for (let i = attributes.length - 1; i >= 0; i--) {
        const attr = attributes[i];
        if (attr.name.startsWith('_processed_') || 
            attr.name.startsWith('bis_') ||
            attr.name.startsWith('data-extension-')) {
          body.removeAttribute(attr.name);
        }
      }
    }
  }, []);

  const strLogo = `/themes/demoa1/images/${arrEmployer.RW_LOGO}`;
  const finalTitle = arrMetaTag.title || title;
  const finalDescription = arrMetaTag.description || description;
  const finalKeywords = arrMetaTag.keywords || keywords;
  const finalOgImage = ogImage || `${GLOBAL_CONFIG.TN}/sharefb?file=${imageShare.file || strLogo}`;

  // Body class based on owner and controller
  const getBodyClass = () => {
    const owner = GLOBAL_CONFIG.OWNER;
    let bodyClass = `frontend_${owner}`;
    
    if (owner === 'sdv') bodyClass = 'frontend_SDV';
    else if (owner === 'vinacapital') bodyClass = 'frontend_Vinacapital';
    else if (owner === 'toa') bodyClass = 'frontendToa';
    else if (owner === 'philip') bodyClass = 'frontend_Philip';
    else if (owner === 'greenfeed') bodyClass = 'frontend_greenfeed';
    else if (owner === 'evolable') bodyClass = 'frontend_evolable';
    else if (owner === 'lafarge') bodyClass = 'frontendLafarge paddingLogo';
    else if (owner === 'masan') bodyClass = 'frontend_masan';
    else if (owner === 'acb') bodyClass = 'frontend_acb';
    else if (owner === 'hdfinance') bodyClass = 'frontendHDFinance';
    else if (owner === 'kido') bodyClass = 'frontend_kido';
    else if (owner === 'oceanbank') bodyClass = 'frontendOceanbank';
    else if (owner === 'baoviet') bodyClass = 'frontendBaoviet';
    else if (owner === 'fujikura') bodyClass = 'frontend_fujikura';
    else if (owner === 'shinhan') bodyClass = 'frontendShinHan';
    else if (owner === 'promanning') bodyClass = 'frontendPromanning';
    else if (owner === 'bimgroup') bodyClass = 'frontendBimGroup';
    else if (owner === 'nestle') bodyClass = 'frontendNestle';
    else if (owner === 'csc') bodyClass = 'frontend_CSC';
    else if (owner === 'toyotamydinh') bodyClass = 'frontendToyota';
    else if (owner === 'vinhhung') bodyClass = 'frontend_VinhHung';
    else if (owner === 'languagelink') bodyClass = 'frontendLanguageLink';
    else if (owner === 'fitgroup') bodyClass = 'frontendFITGroup';
    else if (owner === 'hoasen') bodyClass = 'frontend_hoasen';
    else if (owner === 'lgvietnam') bodyClass = 'frontendLG';
    else if (owner === 'calofic') bodyClass = 'frontendCalofic';
    else if (owner === 'vietravel') bodyClass = 'frontendVietravel';
    else if (owner === 'unitedpharma') bodyClass = 'frontend_UnitedPharma';

    // Add controller-specific classes
    if (controller === 'news' && action === 'employer') bodyClass += ' home_employer';
    if (arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'hremployer', 'acb-event'].includes(controller)) {
      bodyClass += ' frontmobile';
    }
    if (['profile', 'resume'].includes(controller)) bodyClass += ' fontCoreJobseeker';

    return bodyClass;
  };

  return (
    <html lang="en">
      <head>
        <base href={GLOBAL_CONFIG.STATIC_TN} />
        <link rel="shortcut icon" href={`${GLOBAL_CONFIG.STATIC_TN}/favicon_${GLOBAL_CONFIG.OWNER}.ico`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="robots" content="index,follow" />
        
        {/* Title and Meta Tags */}
        <title>{finalTitle}</title>
        <meta name="keywords" content={finalKeywords} />
        <meta name="description" content={finalDescription} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={arrEmployer.EMP_NAME} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:width" content={String(ogImageWidth)} />
        <meta property="og:image:height" content={String(ogImageHeight)} />
        <meta property="og:description" content={finalDescription} />
        
        {/* AMP HTML */}
        {GLOBAL_CONFIG.OWNER === 'hrvietnam' && amphtml_url && (
          <link rel="amphtml" href={amphtml_url} />
        )}
        
        {/* CSS Imports - Using style folder */}
        {/* 1. Base CSS */}
        <link href="/themes/css/general.css?t=20150806" rel="stylesheet" type="text/css" media="screen" />
        <link href="/themes/css/FontAwesome.css" rel="stylesheet" type="text/css" media="screen" />
        {newlayout !== 1 && (
          <link href="/themes/css/core.css?t=1010" rel="stylesheet" type="text/css" media="screen" />
        )}
        
        {/* 2. Theme CSS - Load theme_default first, then demoa1 theme overrides it */}
        <link href="/themes/css/theme_default.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="/themes/demoa1/css/themes.css" rel="stylesheet" type="text/css" media="screen" />
        <link href={`/themes/demoa1/${GLOBAL_CONFIG.OWNER}/skin.css`} rel="stylesheet" type="text/css" media="screen" />
        
        {/* 3. Mobile CSS */}
        {arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'resume', 'profile'].includes(controller) && (
          <link href="/themes/css/TNredirect.css" rel="stylesheet" type="text/css" media="screen" />
        )}
        {GLOBAL_CONFIG.LANGUAGE === 'vi' && (
          <link rel="stylesheet" type="text/css" href="/themes/demoa1/demoa1/nav_vi.css" media="screen" />
        )}
        <link href="/themes/js/jquery_ui/jquery.multiselect.css" rel="stylesheet" type="text/css" />
        <link href="/themes/js/jquery_ui/themes/ui-lightness/jquery-ui.css" rel="stylesheet" type="text/css" />
        {newlayout !== 1 && (
          <link href="/themes/css/fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
        )}
        <link href="/themes/css/jquery-confirm.min.css" rel="stylesheet" type="text/css" />
        <link href="/themes/js/chosen/chosen.css" rel="stylesheet" type="text/css" />
        
        {/* Swiper CSS */}
        <link href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" rel="stylesheet" type="text/css" />
        
        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .jc-bs3-row {
              clear: both;
              float: none;
              width: 33.3333%;
              position: absolute;
              left: 33.3333%;
            }
            @media only screen and (max-width: 640px) {
              .jc-bs3-row {
                width: 100%;
                left: 0;
              }
            }
            
            /* Swiper styles moved to SwiperSlider.css */
            
            #mainslide {
              position: relative;
            }
            
            #search-banner {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 5;
            }
          `
        }} />
        
        {/* Load jQuery FIRST - before any other scripts */}
        <script src="/themes/js/jquery.min.js" />
        
        {/* Global JavaScript Variables */}
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{
          __html: `
            var DOMAIN = '${GLOBAL_CONFIG.DOMAIN}';
            var TN = '${GLOBAL_CONFIG.TN}';
            ${newlayout !== 1 ? `var CKEDITOR_BASEPATH = '${GLOBAL_CONFIG.STATIC_TN}/js/ckeditor/';` : ''}
            var EMP_TN = '${GLOBAL_CONFIG.EMP_TN}';
            var LANGUAGE = '${GLOBAL_CONFIG.LANGUAGE}';
            var OWNER = '${GLOBAL_CONFIG.OWNER}';
            var IMAGES_TN = '${GLOBAL_CONFIG.IMAGES_TN}';
            var STATIC_TN = '${GLOBAL_CONFIG.STATIC_TN}';
            var FILESUPPORT = '${GLOBAL_CONFIG.FILESUPPORT}';
            var EMP_NAME = '${arrEmployer.EMP_NAME}';
            var LINK_FORGOT = '${GLOBAL_CONFIG.LINK_FORGOT}';
            
            // Language object for validation messages
            var language = {
              msg_require: 'This field is required',
              msg_email_blacklist: 'Your email is blacklisted',
              edit_email: 'Edit Email',
              msg_cancel: 'Cancel'
            };
            
            // Helper functions that common.js needs
            function getCookie(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
              return null;
            }
            
            function setCookie(name, value, minutes) {
              var expires = "";
              if (minutes) {
                var date = new Date();
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
              }
              document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }
            
            function createKeyword(str) {
              return str ? str.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : '';
            }
            
            function stripVietnamese(str) {
              return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
            }
            
            function checkIos() {
              return /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
            }
            
            function windowsPhone() {
              return /windows phone/i.test(navigator.userAgent);
            }
          `
        }} />
        
        {/* Initialization Script */}
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{
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
        {notViewIE === 0 && arrEmployer.RW_GOOGLEDRIVE_CLIENT_ID && ['rod', 'demo', 'demo1', 'demo2', 'tonducthang', 'premium', 'demo5', 'demo6'].includes(GLOBAL_CONFIG.OWNER) && (
          <>
            <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{
              __html: `
                var googledrive_client_id = "${arrEmployer.RW_GOOGLEDRIVE_CLIENT_ID}";
                var googledrive_client_app_id = "${googleAppId}";
                $(window).on("load", function() {
                  $("[id*=oauth2relay]").css({'position':'unset','width':'','height':'0','border':'0'});
                });
              `
            }} />
            <script src={`https://www.google.com/jsapi?key=${arrEmployer.RW_GOOGLEDRIVE_CLIENT_ID}`} type="text/javascript" />
            <script src={`${GLOBAL_CONFIG.STATIC_TN}/js/googleresumeapply.js?t=20150806`} type="text/javascript" />
            <script src="https://apis.google.com/js/client.js?onload=handleClientLoad" type="text/javascript" />
          </>
        )}
        
        {/* Dropbox Integration */}
        {notViewIE === 0 && arrEmployer.RW_DROPBOX_KEY && (
          <script src="https://www.dropbox.com/static/api/2/dropins.js" data-app-key={arrEmployer.RW_DROPBOX_KEY} id="dropboxjs" />
        )}
        
        {/* Google Analytics for Job Apply */}
        {controller === 'jobs' && action === 'apply' && isApplyJob && (
          <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{
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
        {headLink}
        {headScript}
        {headStyle}
      </head>
      <body className={getBodyClass()} suppressHydrationWarning={true}>
        {/* Mobile Menu */}
        {arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'resume', 'profile'].includes(controller) && (
          <div id="jPanelMenu-menu">
            <ul>
              <li>
                <ul>
                  {arrSupportedLanguages.length > 1 && (
                    <li>
                      <a href={CHANGE_LANG_URL} className={`flag ${GLOBAL_CONFIG.LANGUAGE === 'en' ? 'vi' : 'en'}_flag`}>
                        {GLOBAL_CONFIG.LANGUAGE === 'en' ? 'Vietnamese' : 'English'}
                      </a>
                    </li>
                  )}
                  {arrInfo ? (
                    <>
                      <li>
                        <a href={`${GLOBAL_CONFIG.EMP_TN}/profile/update`}>
                          Hi {arrInfo.JOBSEEKER_FIRSTNAME}
                        </a>
                      </li>
                      <li>
                        <a href={`${GLOBAL_CONFIG.TN}/logout`} className="btn">Logout</a>
                      </li>
                      <li>
                        <a href={`${GLOBAL_CONFIG.TN}/resume`}>My Career</a>
                        <ul className="submenu">
                          <li>
                            <a className={controller === 'profile' ? 'focus ' : ''} href={`${GLOBAL_CONFIG.EMP_TN}/profile/update`}>
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a className={controller === 'resume' && ['create', 'update', 'index', 'detail'].includes(action) ? 'focus' : ''} href={`${GLOBAL_CONFIG.TN}/resume`}>
                              My Resume
                            </a>
                          </li>
                          <li>
                            <a className={controller === 'resume' && action === 'saved' ? 'focus' : ''} href={`${GLOBAL_CONFIG.TN}/jobs/saved`}>
                              My Saved Jobs
                            </a>
                          </li>
                          <li>
                            <a className={controller === 'resume' && action === 'history' ? 'focus' : ''} href={`${GLOBAL_CONFIG.TN}/resume/history`}>
                              Application History
                            </a>
                          </li>
                          <li>
                            <a className={controller === 'resume' && action === 'preferences' ? 'focus' : ''} href={`${GLOBAL_CONFIG.EMP_TN}/resume/preferences`}>
                              Edit Recommend
                            </a>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a href={`${GLOBAL_CONFIG.TN}/join?url=${currentUrl}`}>Join Our Talent Network</a>
                      </li>
                      <li>
                        <a href={`${GLOBAL_CONFIG.TN}/login`}>Login</a>
                      </li>
                    </>
                  )}
                  {arrMenuCates.map((R) => (
                    <li key={R.CATE_ID}>
                      <a href={
                        (R.CATE_TYPE === 2 || R.CATE_TYPE === 3) && R.CATE_CODE
                          ? `${GLOBAL_CONFIG.TN}/${R.CATE_CODE}-${R.CATE_ID.toString(16)}/${GLOBAL_CONFIG.LANGUAGE}`
                          : R.SUBURL_ID
                          ? `${GLOBAL_CONFIG.TN}${R.SUBURL_VALUE}`
                          : R.CATE_LINK === '#'
                          ? 'javascript:void(0)'
                          : R.CATE_LINK
                      }>
                        {R.CATE_NAME}
                      </a>
                      {R.CHILDREN && (
                        <ul className="submenu">
                          {R.CHILDREN.map((P: any) => (
                            <li key={P.CATE_ID}>
                              <a
                                href={
                                  (P.CATE_TYPE === 2 || P.CATE_TYPE === 3) && P.CATE_CODE
                                    ? `${GLOBAL_CONFIG.TN}/${P.CATE_CODE}-${P.CATE_ID.toString(16)}/${GLOBAL_CONFIG.LANGUAGE}`
                                    : P.SUBURL_ID
                                    ? `${GLOBAL_CONFIG.TN}${P.SUBURL_VALUE}`
                                    : P.CATE_LINK === '#'
                                    ? 'javascript:void(0)'
                                    : P.CATE_LINK
                                }
                                className="link_menu"
                                {...(P.CATE_LINKTARGET ? { target: P.CATE_LINKTARGET } : {})}
                              >
                                {P.CATE_NAME}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
        
        {/* Main Container */}
        <div id="container" className={`${controller === 'news' && action === 'employer' ? 'home_employer' : ''} ${arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'hremployer', 'acb-event'].includes(controller) ? 'frontmobile' : ''} ${['profile', 'resume'].includes(controller) ? 'fontCoreJobseeker' : ''}`}>
          {arrFunction.SUPPORT_MOBILE && ['contact', 'jobs', 'news', 'index', 'testimonial', 'resume', 'profile'].includes(controller) && (
            <div id="menu-trigger"></div>
          )}
          {debugMessage && <div dangerouslySetInnerHTML={{ __html: debugMessage }} />}
          {children}
        </div>
        
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
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{
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
        
        {/* Back to Top Functionality */}
        <script suppressHydrationWarning={true} dangerouslySetInnerHTML={{
          __html: `
            $(function() {
              ${action !== 'employer' ? 'adjustHeight();' : ''}
              
              jQuery.extend(jQuery.validator.messages, {
                required: language.msg_require
              });
              
              if (checkIos()) {
                ${controller === 'jobs' && action === 'apply' ? `
                  $("#fromcomputer").hide();
                  $("#fromdropbox").hide();
                ` : ''}
              }
              
              if (windowsPhone()) {
                ${controller === 'jobs' && action === 'apply' ? `
                  $("#fromcomputer").hide();
                  $("#fromdropbox").hide();
                ` : ''}
              }
              
              $("#back-top").hide();
              $(window).scroll(function() {
                if ($(this).scrollTop() > 100) {
                  $('#back-top').fadeIn();
                } else {
                  $('#back-top').fadeOut();
                }
              });
              
              jQuery('#back-top a').click(function() {
                jQuery('body,html').animate({
                  scrollTop: 0
                }, 400);
                return false;
              });
            });
          `
        }} />
        
        {/* Core JavaScript Libraries */}
        <script src="/themes/js/jquery_ui/jquery-ui.min.js" />
        <script src="/themes/js/jquery_ui/jquery.multiselect.js" />
        <script src="/themes/js/jquery.formatcurrency.js" />
        <script src="/themes/js/jquery.cycle.all.2.74.js" />
        <script src="/themes/js/jquery-confirm.min.js" />
        <script src="/themes/js/lazyload.js" />

        {/* Chosen plugin for select boxes */}
        <script src="/themes/js/chosen/chosen.jquery.js" />

        {/* Additional Scripts - Using style folder */}
        {newlayout !== 1 && (
          <script src="/themes/js/fancybox/jquery.fancybox-1.3.4.js" />
        )}
        <script src="/themes/js/jquery.validate.js" />
        <script src="/themes/js/additional-methods.js" />
        <script src="/themes/js/tn-validate-methods.js" />
        <script src="/themes/js/common.js?t=9" />
        
        {/* Custom CSS and JS */}
        {css_custom === 1 && (
          <link href="custom/css_custom.css" rel="stylesheet" type="text/css" media="screen" />
        )}
        {js_custom === 1 && (
          <script src="custom/js_custom.js" />
        )}
      </body>
    </html>
  );
}
