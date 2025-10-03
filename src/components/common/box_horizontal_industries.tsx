'use client';

import { BoxHorizontalIndustriesProps, Industry } from '@/lib/types';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Jobs by Industry_': {
      vi: 'Việc làm theo ngành nghề',
      en: 'Jobs by Industry'
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

export default function BoxHorizontalIndustries({ 
  siteId, 
  arrIndustries = [], 
  language = 'vi' 
}: BoxHorizontalIndustriesProps) {
  if (arrIndustries.length === 0) {
    return null;
  }

  // Filter industries with jobs and group them into columns (3 columns)
  const industriesWithJobs = arrIndustries.filter(industry => industry.JOB_INDUSTRY_NUM > 0);
  
  // Group industries into 3 columns
  const groupedIndustries: Industry[][] = [[], [], []];
  industriesWithJobs.forEach((industry, index) => {
    const columnIndex = index % 3;
    groupedIndustries[columnIndex].push(industry);
  });

  return (
    <div className="SearchJobBy">
      <div className="JobByIndustry">
        <h3>{t('_Jobs by Industry_', language)}</h3>
        
        {groupedIndustries.map((group, groupIndex) => (
          <ul key={groupIndex} className={groupIndex === 2 ? 'last' : ''}>
            {group.map((industry) => (
              <li key={industry.INDUSTRY_ID}>
                <a 
                  href={industry.LINK} 
                  title={escapeHtml(industry.INDUSTRY_NAME)} 
                  className="link_theme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {industry.INDUSTRY_NAME}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
