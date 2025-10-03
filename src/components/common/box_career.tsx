'use client';

import { BoxCareerProps, Job } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Career Opportunities_': {
      vi: 'Cơ hội nghề nghiệp',
      en: 'Career Opportunities'
    },
    '_View All Jobs_': {
      vi: 'Xem tất cả việc làm',
      en: 'View All Jobs'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to escape HTML (equivalent to PHP escape)
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default function BoxCareer({ 
  siteId, 
  arrJobs = [], 
  jobNum = 5, 
  language = 'vi' 
}: BoxCareerProps) {
  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  if (arrJobs.length === 0) {
    return null;
  }

  // Slice jobs array to show only the specified number
  const displayJobs = arrJobs.slice(0, jobNum);

  const handleViewAllJobs = () => {
    window.location.href = siteConfig.constants.LINK_JOBS || '/jobs';
  };

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">
        {t('_Career Opportunities_', language)}
      </div>
      
      <div className="containerBox">
        <ul className="ListCareer">
          {displayJobs.map((job, index) => (
            <li key={index}>
              <a 
                href={job.LINK} 
                title={escapeHtml(job.JOB_TITLE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {job.JOB_TITLE}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="allJobBtn">
          <input 
            type="submit" 
            className="ui_btnCb btnSmall" 
            value={t('_View All Jobs_', language)}
            onClick={handleViewAllJobs}
          />
        </div>
      </div>
    </div>
  );
}
