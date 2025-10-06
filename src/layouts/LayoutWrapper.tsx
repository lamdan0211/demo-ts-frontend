'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Layout03 from '@/layouts/Layout03';
import Layout04 from '@/layouts/Layout04';
import LayoutPremium from '@/layouts/LayoutPremium';
import Layout from '@/layouts/Layout';

interface LayoutWrapperProps {
  children: React.ReactNode;
  siteId: string;
  owner?: string;
  tempName?: string;
  layoutType?: string;
  controller?: string;
  action?: string;
  newlayout?: number;
  arrFunction?: {
    SUPPORT_MOBILE: boolean;
  };
  arrSupportedLanguages?: string[];
  arrMenuCates?: any[];
  CHANGE_LANG_URL?: string;
  arrInfo?: any;
  currentUrl?: string;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  arrEmployer?: any;
  arrMetaTag?: any;
  [key: string]: any;
}

// ThemeImage component
interface ThemeImageProps {
  siteId: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

function ThemeImage({ 
  siteId, 
  src, 
  alt, 
  width = 0, 
  height = 0, 
  className = '',
  priority = false 
}: ThemeImageProps) {
  const imagePath = `/themes/${siteId}/${src}`;
  
  return (
    <Image
      src={imagePath}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

export default function LayoutWrapper({ 
  children, 
  siteId,
  owner = 'demoa1',
  tempName = 'demoa1',
  layoutType = '03',
  controller = 'index',
  action = 'index',
  newlayout = 0,
  arrFunction = { SUPPORT_MOBILE: true },
  arrSupportedLanguages = ['en', 'vi'],
  arrMenuCates = [],
  CHANGE_LANG_URL = '/en',
  arrInfo = null,
  currentUrl = '',
  title = '',
  description = '',
  keywords = '',
  ogImage = '',
  ogImageWidth = 0,
  ogImageHeight = 0,
  arrEmployer = null,
  arrMetaTag = null
}: LayoutWrapperProps) {
  useEffect(() => {
    // Load CSS files based on layout type and owner
    const loadCSS = () => {
      const baseCSS = [
         '/themes/css/theme_default.css',
        '/themes/css/general.css',
        '/themes/css/FontAwesome.css',
        '/themes/css/core.css'
       
      ];

      // CSS theo cấu trúc: /themes/{tempName}/css/themes.css và /themes/{tempName}/{owner}/skin.css
      const themeCSS = [
        `/themes/${tempName}/css/themes.css`,
        `/themes/${tempName}/${owner}/skin.css`,
        // `/themes/${tempName}/css/nav_vi.css`
      ];

      const pluginCSS = [
        '/themes/js/jquery_ui/jquery.multiselect.css',
        '/themes/js/jquery_ui/themes/ui-lightness/jquery-ui.css',
        '/themes/js/chosen/chosen.min.css',
        '/themes/css/fancybox/jquery.fancybox-1.3.4.css',
        '/themes/css/jquery-confirm.min.css'
      ];

      const allCSS = [...baseCSS, ...themeCSS, ...pluginCSS];

      allCSS.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        link.media = 'screen';
        document.head.appendChild(link);
      });
      
      // Add menu hover styles
      const menuHoverStyle = document.createElement('style');
      menuHoverStyle.type = 'text/css';
      menuHoverStyle.innerHTML = `
        #nav-bar ul.submenu { 
          position: absolute; 
          left: 0; 
          display: none; 
          z-index: 10000;
          min-width: 200px;
          width: auto;
        }
        #nav-bar .over ul.submenu { 
          display: block; 
        }
        #nav-bar ul.submenu li { 
          clear: both; 
          float: left; 
          width: 100%; 
        }
        #nav-bar ul.submenu a { 
          display: block; 
          background-image: url("/themes/css/images/arr_white.gif"); 
          background-repeat: no-repeat;
          background-position: 10px 12px;
          background-color: #226fb0;
          border-top: 1px solid #fff;
          border-bottom: 0;
          font-size: 12px;
          padding: 6px 0 6px 20px;
          color: #fff;
        }
        #nav-bar ul.submenu a:hover { 
          border-top: 1px solid #fff; 
          background-color: #15487c; 
          border-bottom: 0; 
        }
      `;
      document.head.appendChild(menuHoverStyle);
    };

    // Load JavaScript files
    const loadScripts = () => {
      // Load jQuery first and wait for it to be ready
      const loadJQuery = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = '/themes/js/jquery.min.js';
          script.onload = () => {
            // Wait for jQuery to be available
            const checkJQuery = () => {
              if ((window as any).jQuery) {
                resolve(undefined);
              } else {
                setTimeout(checkJQuery, 10);
              }
            };
            checkJQuery();
          };
          document.head.appendChild(script);
        });
      };

      // Load other scripts after jQuery is ready
      const loadOtherScripts = () => {
        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => resolve(); // Continue even if script fails
            document.head.appendChild(script);
          });
        };

        // Load scripts sequentially to ensure proper order
        const loadSequentially = async () => {
          await loadScript('/themes/js/jquery_ui/jquery-ui.min.js');
          await loadScript('/themes/js/jquery_ui/jquery.multiselect.js');
          await loadScript('/themes/js/chosen/chosen.jquery.min.js');
          await loadScript('/themes/js/jquery.formatcurrency.js');
          await loadScript('/themes/js/jquery.cycle.all.2.74.js');
          await loadScript('/themes/js/jquery-confirm.min.js');
          await loadScript('/themes/js/lazyload.js');
          await loadScript('/themes/js/fancybox/jquery.fancybox-1.3.4.js');
          await loadScript('/themes/js/jquery.validate.js');
          await loadScript('/themes/js/additional-methods.js');
          await loadScript('/themes/js/tn-validate-methods.js');
          await loadScript('/themes/js/hoverIntent.js');
          await loadScript('/themes/js/common.js');
          await loadScript('/themes/js/common_premium.js');
          await loadScript(`/themes/${siteId}/custom/js_custom.js`);
        };

        loadSequentially().then(() => {
          // Load initialization script after all scripts are loaded
          loadInitScript();
          
          // Initialize showDialog functionality after all scripts are loaded
          setTimeout(() => {
            if ((window as any).jQuery && (window as any).jQuery.fancybox) {
              (window as any).jQuery('.showDialog').fancybox({
                'padding': 0,
                onComplete: function() {
                  const fancyboxContent = (window as any).jQuery('#fancybox-content');
                  if (fancyboxContent.length) {
                    (window as any).jQuery('#fancybox-wrap').css({ 
                      'width': (fancyboxContent.width() + 40) + 'px', 
                      'padding': 0 
                    });
                  }
                }
              });
              
              if (!checkMobile()) {
                (window as any).jQuery('.showDialogD').fancybox({
                  'padding': 0,
                  onComplete: function() {
                    const fancyboxContent = (window as any).jQuery('#fancybox-content');
                    if (fancyboxContent.length) {
                      (window as any).jQuery('#fancybox-wrap').css({ 
                        'width': (fancyboxContent.width() + 40) + 'px', 
                        'padding': 0 
                      });
                    }
                  }
                });
              }
            }
            
            // Initialize menu hover functionality
            if ((window as any).jQuery) {
              const $ = (window as any).jQuery;
              
              // Add hover functionality for #nav-bar menu
              $('#nav-bar li.parent').hover(
                function() {
                  $(this).addClass('over');
                  $(this).children('ul.submenu').show();
                },
                function() {
                  $(this).removeClass('over');
                  $(this).children('ul.submenu').hide();
                }
              );
            }
          }, 100);
        });
      };

      // Load jQuery first, then other scripts
      loadJQuery().then(loadOtherScripts);
    };

    // Load global variables
    const loadGlobalVariables = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        var DOMAIN = 'localhost:3001';
        var TN = '/${siteId}';
        var CKEDITOR_BASEPATH = '/themes/js/ckeditor/';
        var EMP_TN = '/employers';
        var LANGUAGE = 'vi';
        var language = 'vi';
        var OWNER = '${owner}';
        var IMAGES_TN = '/images';
        var STATIC_TN = '/themes';
        var FILESUPPORT = 'pdf,doc,docx';
        var EMP_NAME = 'Job Portal';
        var LINK_FORGOT = '/forgot-password';
        var Controller = '${controller}';
        var Action = '${action}';
        var Layout_Template = 'P31';

        function checkIos() {
          return /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
        }

        function windowsPhone() {
          return /windows phone/i.test(navigator.userAgent);
        }

        function checkMobile() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

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
          return str ? str.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '') : '';
        }
      `;
      document.head.appendChild(script);
    };

    // Load initialization script
    const loadInitScript = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        $(document).ready(function() {
          $(".lazyload").lazyload();
        });
      `;
      document.head.appendChild(script);
    };

    // Load all resources
    loadCSS();
    loadScripts();
    loadGlobalVariables();
  }, [siteId, owner, tempName, controller, action]);

  // Render layout based on layoutType
  const renderLayout = () => {
    const commonProps = {
      siteId,
      owner,
      tempName,
      layoutType,
      controller,
      action,
      newlayout,
      arrFunction,
      arrSupportedLanguages,
      arrMenuCates,
      CHANGE_LANG_URL,
      arrInfo,
      currentUrl,
      title,
      description,
      keywords,
      ogImage,
      ogImageWidth,
      ogImageHeight,
      arrEmployer,
      arrMetaTag
    };

    switch (layoutType) {
      case '03':
        return <Layout03 {...commonProps}>{children}</Layout03>;
      
      case '04':
        return <Layout04 {...commonProps}>{children}</Layout04>;
      
      case 'premium':
        return <LayoutPremium {...commonProps}>{children}</LayoutPremium>;
      
      case 'main':
      default:
        return <Layout {...commonProps}>{children}</Layout>;
    }
  };

  return renderLayout();
}

// Export ThemeImage as named export
export { ThemeImage };
