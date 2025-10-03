'use client';

import { useEffect, useState } from 'react';
import { BoxMediaProps } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

export default function BoxMedia({ 
  siteId, 
  controller, 
  action, 
  cateId 
}: BoxMediaProps) {
  const [mediaContent, setMediaContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  useEffect(() => {
    const loadMedia = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`${siteConfig.constants.TN}/ajax/load-media`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            con: controller || '',
            ac: action || '',
            cate: cateId || ''
          })
        });

        if (!response.ok) {
          throw new Error('Failed to load media');
        }

        const content = await response.text();
        setMediaContent(content);
      } catch (err) {
        console.error('Error loading media:', err);
        setError('Failed to load media content');
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [siteId, controller, action, cateId, siteConfig.constants.TN]);

  return (
    <div id="box_media">
      {loading && (
        <div className="loading-placeholder">
          <p>Loading media content...</p>
        </div>
      )}
      
      {error && (
        <div className="error-placeholder">
          <p>Error: {error}</p>
        </div>
      )}
      
      {!loading && !error && mediaContent && (
        <div 
          dangerouslySetInnerHTML={{ 
            __html: mediaContent 
          }} 
        />
      )}
      
      {!loading && !error && !mediaContent && (
        <div className="empty-placeholder">
          <p>No media content available</p>
        </div>
      )}
    </div>
  );
}
