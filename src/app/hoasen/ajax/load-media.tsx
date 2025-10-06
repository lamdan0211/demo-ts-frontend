'use client';

import React from 'react';

// Types for media data
interface MediaItem {
  SO_MEDIA_GROUPID?: number;
  SO_MEDIA_PATH?: string;
  SO_MEDIA_URL?: string;
  SO_MEDIA_WINDOW?: number; // 1 = _self, 2 = _blank
  SO_MEDIA_SCRIPT_CODE?: string;
}

interface LoadMediaProps {
  arrListMedia?: MediaItem[];
  arrMediaGroup?: Record<number, MediaItem[]>;
  IMAGES_TN?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    // Add translations as needed
  };
  
  return translations[key]?.[language] || key;
}

export default function LoadMedia({ 
  arrListMedia = [], 
  arrMediaGroup = {},
  IMAGES_TN = '/themes/images/rewrite/'
}: LoadMediaProps) {
  
  // Load jQuery cycle plugin for media groups
  React.useEffect(() => {
    const loadCyclePlugin = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        // jQuery cycle plugin should be loaded by LayoutWrapper
        // Initialize cycle for each group
        Object.keys(arrMediaGroup).forEach((groupId) => {
          const groupElement = document.getElementById(`group${groupId}`);
          if (groupElement && (window as any).jQuery) {
            setTimeout(() => {
              (window as any).jQuery(`#group${groupId}`).cycle({
                fx: 'fade',
                timeout: 5000,
                pauseOnPagerHover: true
              });
            }, 50);
          }
        });
      }
    };

    // Wait for jQuery to be available
    const checkJQuery = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        loadCyclePlugin();
      } else {
        setTimeout(checkJQuery, 100);
      }
    };

    checkJQuery();
  }, [arrMediaGroup]);

  const renderMediaItem = (item: MediaItem, key?: string | number) => {
    if (!item.SO_MEDIA_PATH && !item.SO_MEDIA_SCRIPT_CODE) {
      return null;
    }

    return (
      <div key={key} className="BoxHolder">
        {item.SO_MEDIA_PATH && (
          <>
            {item.SO_MEDIA_URL ? (
              <a 
                href={item.SO_MEDIA_URL}
                target={item.SO_MEDIA_WINDOW === 2 ? '_blank' : '_self'}
              >
                <img 
                  width="250" 
                  src={`${IMAGES_TN}${item.SO_MEDIA_PATH}`}
                  alt="Media"
                />
              </a>
            ) : (
              <img 
                width="250" 
                src={`${IMAGES_TN}${item.SO_MEDIA_PATH}`}
                alt="Media"
              />
            )}
          </>
        )}
        
        {item.SO_MEDIA_SCRIPT_CODE && (
          <div 
            dangerouslySetInnerHTML={{ 
              __html: item.SO_MEDIA_SCRIPT_CODE 
            }} 
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* Render individual media items (not in groups) */}
      {arrListMedia.map((item, index) => {
        if (!item.SO_MEDIA_GROUPID) {
          return renderMediaItem(item, `individual-${index}`);
        }
        return null;
      })}

      {/* Render media groups */}
      {Object.entries(arrMediaGroup).map(([groupId, groupItems]) => (
        <div key={`group-${groupId}`} className="BoxHolder" id={`group${groupId}`}>
          {groupItems.map((item, index) => 
            renderMediaItem(item, `group-${groupId}-${index}`)
          )}
        </div>
      ))}
    </>
  );
}
