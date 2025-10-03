'use client';

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  owner?: string;
  tempName?: string;
  layoutType?: string;
  [key: string]: any;
}

export default function Layout03({
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
      <link href={`/themes/${tempName || 'demoa1'}/${tempName || 'demoa1'}/nav_vi.css?t=12032015`} rel="stylesheet" type="text/css" media="screen" />
      <link href="/themes/js/jquery_ui/jquery.multiselect.css" rel="stylesheet" type="text/css" />
      <link href="/themes/js/jquery_ui/themes/ui-lightness/jquery-ui.css" rel="stylesheet" type="text/css" />
      <link href="/themes/css/fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
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
      <script src="../js/jquery_ui/jquery-ui.min.js"></script>
      <script src="../js/jquery_ui/jquery.multiselect.js"></script>
      <script src="../js/jquery.formatcurrency.js"></script>
      <script src="../js/jquery.cycle.all.2.74.js"></script>
      <script src="../js/jquery-confirm.min.js"></script>
      <script src="../js/lazyload.js"></script>
      
      {/* Global JavaScript Variables */}
      <script dangerouslySetInnerHTML={{
        __html: `
          var DOMAIN = 'localhost:3000';
          var TN = '/${owner}';
          var CKEDITOR_BASEPATH = '/style/js/ckeditor/';
          var EMP_TN = '/employers';
          var LANGUAGE = 'en';
          var OWNER = '${owner}';
          var IMAGES_TN = '/images';
          var STATIC_TN = '/style';
          var FILESUPPORT = 'pdf,doc,docx';
          var EMP_NAME = 'Job Portal';
          var LINK_FORGOT = '/forgot-password';

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