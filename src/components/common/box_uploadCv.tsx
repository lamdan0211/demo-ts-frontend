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
        <img 
          src="/template02/images/upload.png" 
          alt="Upload CV"
          style={{ width: '100%', height: 'auto' }}
        />
      </a>
    </div>
  );
}
