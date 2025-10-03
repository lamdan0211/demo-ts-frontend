'use client';

import { FooterProps, FooterMenuCategory } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

// Helper function to convert decimal to hex (equivalent to PHP dec2hex)
function dec2hex(dec: number): string {
  return dec.toString(16);
}

// Helper function to generate URL based on category type and data
function generateUrl(category: FooterMenuCategory, constants: { TN: string; LANGUAGE: string }): string {
  const { CATE_TYPE, CATE_CODE, CATE_ID, CATE_LINK, SUBURL_ID, SUBURL_VALUE } = category;
  
  if ((CATE_TYPE === 2 || CATE_TYPE === 3) && CATE_CODE) {
    return `${constants.TN}/${CATE_CODE}-${dec2hex(CATE_ID)}/${constants.LANGUAGE}`;
  }
  
  if (SUBURL_ID) {
    return `${constants.TN}${SUBURL_VALUE}`;
  }
  
  if (CATE_LINK === '#') {
    return 'javascript:void(0)';
  }
  
  return CATE_LINK || '#';
}

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_By Employer_': {
      vi: 'Được phát triển bởi',
      en: 'Developed by'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function Footer({ siteId, footerMenuCates = [], language = 'vi' }: FooterProps) {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  const constants = siteConfig.constants;

  return (
    <div id="footer" className="bgcolor_theme">
      <div className="bodyContainer">
        <div className="linkofClient">
          {footerMenuCates.map((category, index) => (
            <span key={category.CATE_ID}>
              <a 
                href={generateUrl(category, constants)} 
                className="link_menu"
                target={category.CATE_LINKTARGET || undefined}
              >
                {category.CATE_NAME}
              </a>
              {index < footerMenuCates.length - 1 && (
                <span className="separated">|</span>
              )}
            </span>
          ))}
        </div>
        
        <div className="developed-by-CB">
          <p>{t('_By Employer_', language)}</p>
          {/* 
          <p>Powered by <a href="http://careerbuilder.vn/" target="_blank"><strong><font color="#ff5b00">Career</font><font color="#fff">Builder.vn</font></strong></a></p>
          {language === 'en' ? (
            <p>
              <a href="http://careerbuilder.talentnetwork.vn/news/term-of-use.35a512b7/en" className="link_menu">Terms of Use</a>
              <span className="separated">|</span>
              <a href="http://careerbuilder.talentnetwork.vn/news/privacy-policy.35a512b6/en" className="link_menu">Privacy Policy</a>
              <span className="separated">|</span>
              <a href="http://careerbuilder.talentnetwork.vn/news/faqs.35a512b5/en" className="link_menu">FAQs</a>
            </p>
          ) : (
            <p>
              <a href="http://careerbuilder.talentnetwork.vn/tin-tuc/dieu-khoan-su-dung.35a512b7/vi" className="link_menu">Điều khoản sử dụng</a>
              <span className="separated">|</span>
              <a href="http://careerbuilder.talentnetwork.vn/tin-tuc/chinh-sach-bao-mat.35a512b6/vi" className="link_menu">Chính sách bảo mật</a>
              <span className="separated">|</span>
              <a href="http://careerbuilder.talentnetwork.vn/tin-tuc/cau-hoi-thuong-gap.35a512b5/vi" className="link_menu">Câu hỏi thường gặp</a>
            </p>
          )}
          */}
        </div>
      </div>
    </div>
  );
}
