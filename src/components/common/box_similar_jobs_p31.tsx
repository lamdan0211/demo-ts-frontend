'use client';

import React from 'react';

// Types
interface SimilarJob {
  JOB_TITLE: string;
  LINK: string;
  JOB_LOCATION_NAME?: string;
  JOB_SALARYUNIT?: string;
  JOB_FROMSALARY?: number;
  JOB_TOSALARY?: number;
  JOB_EXPIREDATE?: string;
  JOB_ACTIVEDATE?: string;
  DEP_ID?: number;
  logo_dep?: string;
}

interface SalaryUnit {
  [key: string]: string;
}

interface BoxSimilarJobsP31Props {
  arrSimilarJobs?: SimilarJob[];
  language?: 'vi' | 'en';
  LANGUAGE?: string;
  IMAGES_TN?: string;
  showLogoListJob?: string;
  linkLogoListJob?: string;
  showExpiredListJob?: string;
  currency?: string;
  arrSalaryUnits?: SalaryUnit;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Similar Jobs_': {
      vi: 'Việc làm tương tự',
      en: 'Similar Jobs'
    },
    'Job Title': {
      vi: 'Vị trí tuyển dụng',
      en: 'Job Title'
    },
    'Location': {
      vi: 'Địa điểm',
      en: 'Location'
    },
    '_Salary_': {
      vi: 'Mức lương',
      en: 'Salary'
    },
    '_Job expiredate Date_': {
      vi: 'Ngày hết hạn',
      en: 'Expiry Date'
    },
    '_unlimited_': {
      vi: 'Không giới hạn',
      en: 'Unlimited'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to format salary
function formatSalary(job: SimilarJob, currency: string, arrSalaryUnits: SalaryUnit): string {
  if (!job.JOB_SALARYUNIT) return '';
  
  const currencyArray = currency.split(',');
  const isVND = job.JOB_SALARYUNIT === 'vnd';
  const isUSD = job.JOB_SALARYUNIT === 'usd';
  const isInCurrency = currencyArray.includes(job.JOB_SALARYUNIT) || job.JOB_SALARYUNIT === currency;
  
  if (isVND || isUSD || isInCurrency) {
    const fromSalary = job.JOB_FROMSALARY ? job.JOB_FROMSALARY.toLocaleString() : '';
    const toSalary = job.JOB_TOSALARY ? job.JOB_TOSALARY.toLocaleString() : '';
    
    if (fromSalary && toSalary) {
      return `${fromSalary} - ${toSalary}`;
    } else if (fromSalary) {
      return `Từ ${fromSalary}`;
    } else if (toSalary) {
      return `Đến ${toSalary}`;
    }
  }
  
  return arrSalaryUnits[job.JOB_SALARYUNIT] || '';
}

// Helper function to cut locations
function cutCommusLocations(location: string): string {
  if (!location) return '';
  const locations = location.split(',');
  return locations.length > 2 ? locations.slice(0, 2).join(', ') + '...' : location;
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return t('_unlimited_');
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
}

export default function BoxSimilarJobsP31({
  arrSimilarJobs = [],
  language = 'vi',
  LANGUAGE = 'vi',
  IMAGES_TN = '/themes/images/rewrite',
  showLogoListJob = '',
  linkLogoListJob = '',
  showExpiredListJob = '',
  currency = 'vnd',
  arrSalaryUnits = {}
}: BoxSimilarJobsP31Props) {
  
  if (!arrSimilarJobs || arrSimilarJobs.length === 0) {
    return null;
  }

  const showLogo = showLogoListJob && showLogoListJob !== '_show_logo_list_job_';
  const showExpired = showExpiredListJob && showExpiredListJob !== '_show_expired_list_job_';
  const logoLink = linkLogoListJob && linkLogoListJob !== '_link_logo_list_job_' ? linkLogoListJob : 'images/logo-default.png';

  return (
    <div className="section-page section-jobs similar-jobs">
      <div className="container">
        <header>
          <h2 className="section-title">{t('_Similar Jobs_', language)}</h2>
        </header>
        
        <div className="component-body">
          <table className="table" id="lstJob">
            <thead className={LANGUAGE}>
              <tr>
                <th className="table-header-1">{t('Job Title', language)}</th>
                <th className="table-header-2">{t('Location', language)}</th>
                <th className="table-header-3">{t('_Salary_', language)}</th>
                <th className="table-header-4">{t('_Job expiredate Date_', language)}</th>
              </tr>
            </thead>
            
            <tbody>
              {arrSimilarJobs.slice(0, 10).map((job, index) => (
                <tr key={index}>
                  <td className="table-item table-item-title">
                    <a 
                      href={job.LINK} 
                      title={job.JOB_TITLE} 
                      className="table-item--link"
                    >
                      <h4 className="table-item--title-heading">{job.JOB_TITLE}</h4>
                    </a>
                    
                    {showLogo && (
                      <div className="col-xs-12 company-logo">
                        <table style={{ tableLayout: 'fixed' }} width="100%" height="100%" cellSpacing="0" cellPadding="0">
                          <tbody>
                            <tr>
                              <td>
                                <img 
                                  src={job.logo_dep ? `${IMAGES_TN}/rws/department/${job.logo_dep}` : logoLink}
                                  alt="Company Logo"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                  
                  {job.JOB_LOCATION_NAME && (
                    <td className="table-item item-valign-top">
                      <span>{t('Location', language)}: </span>
                      {cutCommusLocations(job.JOB_LOCATION_NAME)}
                    </td>
                  )}
                  
                  <td className="table-item item-valign-top">
                    <span>{t('_Salary_', language)}: </span>
                    {formatSalary(job, currency, arrSalaryUnits)}
                  </td>
                  
                  <td className="table-item item-valign-top">
                    <span>{t('_Job expiredate Date_', language)}: </span>
                    {showExpired ? (
                      job.JOB_EXPIREDATE ? job.JOB_EXPIREDATE : t('_unlimited_', language)
                    ) : (
                      job.JOB_ACTIVEDATE ? formatDate(job.JOB_ACTIVEDATE) : t('_unlimited_', language)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
