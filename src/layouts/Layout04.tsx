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
      {/* Legacy CSS links removed */}
      <link href="/themes/css/jquery-confirm.min.css" rel="stylesheet" type="text/css" />


      {/* Global JavaScript Variables */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Essential global variables
          var DOMAIN = 'localhost:3000';
          var TN = '/${owner}';
          var LANGUAGE = 'en';
          var OWNER = '${owner}';
          var IMAGES_TN = '/images';
          var STATIC_TN = '/style';
          var EMP_NAME = 'Job Portal';
          
          // Essential functions
          var checkMobile = function() {
            return window.innerWidth <= 640;
          };
        `
      }} />


      {/* Main Content */}
      <div className="main-wrapper">
        {children}
      </div>
    </>
  );
}