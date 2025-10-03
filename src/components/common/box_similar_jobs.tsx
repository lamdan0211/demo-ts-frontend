'use client';

import { BoxSimilarJobsProps, Job } from '@/lib/types';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Similar Jobs_': {
      vi: 'Việc làm tương tự',
      en: 'Similar Jobs'
    },
    '_View more_': {
      vi: 'Xem thêm',
      en: 'View more'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function BoxSimilarJobs({ 
  arrSimilarJobs = [], 
  language = 'vi' 
}: BoxSimilarJobsProps) {
  // If no similar jobs, don't render anything
  if (!arrSimilarJobs || arrSimilarJobs.length === 0) {
    return null;
  }

  // Get first 10 similar jobs
  const topSimilarJobs = arrSimilarJobs.slice(0, 10);

  return (
    <div className="BoxHolder">
      <div className="bgcolor_theme headerBox">
        {t('_Similar Jobs_', language)}
      </div>
      <div className="containerBox">
        <ul className="ListCareer">
          {topSimilarJobs.map((job: Job, index: number) => (
            <li key={job.JOB_ID || index}>
              <a 
                href={job.LINK} 
                title={job.JOB_TITLE}
              >
                {job.JOB_TITLE}
              </a>
            </li>
          ))}
        </ul>
        {/* View more link is commented out in original template */}
        {/* {arrSimilarJobs.length > 5 && (
          <a 
            href="/demoa1/jobs/all/?tab=category" 
            className="link_theme viewmore"
          >
            {t('_View more_', language)}
          </a>
        )} */}
      </div>
    </div>
  );
}
