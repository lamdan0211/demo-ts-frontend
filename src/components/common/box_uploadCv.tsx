'use client';

import { BoxUploadCvProps } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

export default function BoxUploadCv({ 
  siteId, 
  arrInfo, 
  currentUrl = '/' 
}: BoxUploadCvProps) {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  // Determine the link and class based on user login status
  const linkUrl = arrInfo ? siteConfig.constants.LINK_RESUME : `/join?url=${currentUrl}`;
  const linkClass = arrInfo ? '' : 'showDialogD';

  return (
    <div className="BoxHolder">
      <a 
        href={linkUrl} 
        className={linkClass}
        title={arrInfo ? 'Upload CV' : 'Join to upload CV'}
      >
        <div 
          style={{ 
            width: '100%', 
            height: '120px', 
            backgroundColor: '#f8f9fa', 
            border: '2px dashed #dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6c757d',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          📄 Upload CV
        </div>
      </a>
    </div>
  );
}
