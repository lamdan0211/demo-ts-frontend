'use client';

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  owner?: string;
  tempName?: string;
  layoutType?: string;
  [key: string]: any;
}

export default function Layout04({
  children,
  owner = 'default',
  tempName,
  layoutType,
  ...props
}: LayoutProps) {
  return (
    <>
        {/* CSS Imports */}
      <link href="/themes/css/general.css" rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/css/FontAwesome.css" rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/css/core.css?t=20171010" rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/css/theme_default.css" rel="stylesheet" type="text/css" media="screen" />
      <link href={`/themes/${tempName || 'demoa1'}/css/themes.css?t=100520152`} rel="stylesheet" type="text/css" media="screen" />
      <link href={`/themes/${tempName || 'demoa1'}/${owner}/skin.css?t=12032015`} rel="stylesheet" type="text/css" media="screen" />
      <link href={`/themes/${tempName || 'demoa1'}/css/nav_vi.css?t=12032015`} rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/js/jquery_ui/jquery.multiselect.css" rel="stylesheet" type="text/css" />
      <link href="/themes/js/jquery_ui/themes/ui-lightness/jquery-ui.css" rel="stylesheet" type="text/css" />
      <link href="/themes/css/jquery-confirm.min.css" rel="stylesheet" type="text/css" />
        
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
          `
        }} />
        
      {/* JavaScript Imports */}
      <script src="/themes/js/jquery.min.js"></script>
      <script src="/themes/js/jquery_ui/jquery-ui.min.js"></script>
      <script src="/themes/js/jquery_ui/jquery.multiselect.js"></script>
      <script src="/themes/js/jquery-confirm.min.js"></script>
      <script src="/themes/js/lazyload.js"></script>
      <script src="/themes/js/hoverIntent.js"></script>
      <script src="/themes/js/common.js"></script>
      <script src="/themes/js/common_premium.js"></script>
        
        {/* Global JavaScript Variables */}
        <script dangerouslySetInnerHTML={{
          __html: `
          var DOMAIN = 'localhost:3000';
          var TN = '/${owner}';
          var CKEDITOR_BASEPATH = '/style/js/ckeditor/';
          var EMP_TN = '/employers';
          var LANGUAGE = 'en';
          var language = {
            Show_fancybox_notification: 0,
            Link_image_fancybox_noti: '',
            member_register_write_lastname: 'Họ',
            member_register_write_firstname: 'Tên',
            employer_register_write_fullname: 'Tên đầy đủ',
            employer_register_write_currentposition: 'Vị trí hiện tại',
            employer_write_foldername: 'Tên thư mục'
          };
          var OWNER = '${owner}';
          var IMAGES_TN = '/images';
          var STATIC_TN = '/style';
          var FILESUPPORT = 'pdf,doc,docx';
          var EMP_NAME = 'Job Portal';
          var LINK_FORGOT = '/forgot-password';
          var Controller = '${controller}';
          var Action = '${action}';
          var Layout_Template = '04';
          var checkMobile = function() {
            return window.innerWidth <= 640;
          };
            
            function checkIos() {
              return /webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
            }
            
            function windowsPhone() {
              return /windows phone/i.test(navigator.userAgent);
            }
          `
        }} />
        
      {/* Document Ready Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          $(document).ready(function() {
            $(".lazyload").lazyload();
            
          });
        `
      }} />
        
      {/* Main Content */}
      <div className="main-wrapper">
                    {children}
                  </div>
    </>
  );
}