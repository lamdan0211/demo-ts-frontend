'use client';

import { useEffect } from 'react';
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

export default function LayoutWrapper({
  children,
  siteId,
  owner = 'demoa1',
  tempName = 'demoa1',
  layoutType = 'default',
  controller = 'index',
  action = 'index',
  newlayout = 0,
  arrFunction = { SUPPORT_MOBILE: true },
  arrSupportedLanguages = ['vi', 'en'],
  arrMenuCates = [],
  CHANGE_LANG_URL = '/change-language',
  arrInfo = {},
  currentUrl = '',
  title = 'Default Title',
  description = 'Default Description',
  keywords = 'default keywords',
  ogImage = '',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  arrEmployer = {},
  arrMetaTag = {}
}: LayoutWrapperProps) {
  
  useEffect(() => {
    // Legacy JS loading removed - using React components instead
    console.log('LayoutWrapper: Legacy JS loading disabled - using React components');
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
      
      default:
        return <Layout {...commonProps}>{children}</Layout>;
    }
  };

  return renderLayout();
}