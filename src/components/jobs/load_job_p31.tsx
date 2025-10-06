'use client';

import React, { useEffect } from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface Job {
  JOB_TITLE: string;
  LINK: string;
  JOB_LOCATION_NAME: string;
  JOB_SALARYUNIT: string;
  JOB_FROMSALARY: number;
  JOB_TOSALARY: number;
  JOB_EXPIREDATE?: string;
  logo_dep?: string;
}

interface LoadJobP31Props {
  arrJobs: Job[];
  arrSalaryUnits: Record<string, string>;
  siteId?: string;
  language: string;
}

export default function LoadJobP31({
  arrJobs,
  arrSalaryUnits,
  siteId = 'demoa1',
  language = 'vi'
}: LoadJobP31Props) {
  const t = useTranslations(language);

  // Helper functions
  const cutcommusLocations = (locations: string): string => {
    return locations.replace(/,/g, ', ');
  };

  const formatSalary = (from: number, to: number, unit: string): string => {
    const arrCurrency = t('_currency_').split(',');
    
    if (unit === 'vnd' || unit === 'usd' || arrCurrency.includes(unit) || unit === t('_currency_')) {
      if (unit === 'vnd') {
        // Apply showsalary formatting for VND
        const formattedFrom = from.toLocaleString('vi-VN');
        const formattedTo = to.toLocaleString('vi-VN');
        return `${formattedFrom} - ${formattedTo}`;
      } else {
        const formattedFrom = from.toLocaleString();
        const formattedTo = to.toLocaleString();
        return `${formattedFrom} - ${formattedTo}`;
      }
    }
    
    return '';
  };

  const getLogoUrl = (logoDep?: string): string => {
    if (logoDep) {
      return `/themes/${siteId}/images/rws/department/${logoDep}`;
    }
    return `/themes/${siteId}/images/logo-default.png`;
  };

  // Initialize lazy loading
  useEffect(() => {
    const initializeLazyLoading = () => {
      if ((window as any).lazyload) {
        (window as any).lazyload();
      } else if ((window as any).$ && (window as any).$.fn.lazyload) {
        (window as any).$('.lazyload').lazyload();
      }
    };

    // Wait for lazy load library to be available
    const checkAndInitialize = () => {
      if ((window as any).lazyload || ((window as any).$ && (window as any).$.fn.lazyload)) {
        initializeLazyLoading();
      } else {
        setTimeout(checkAndInitialize, 100);
      }
    };

    checkAndInitialize();
  }, [arrJobs]);

  if (!arrJobs || arrJobs.length === 0) {
    return null;
  }

  return (
    <>
      {arrJobs.map((job, index) => (
        <tr key={index}>
          <td className="table-item table-item-title">
            <a 
              href={job.LINK} 
              title={job.JOB_TITLE} 
              className="table-item--link"
            >
              <h4 className="table-item--title-heading">{job.JOB_TITLE}</h4>
            </a>
            
            <div className="col-xs-12 company-logo">
              <table style={{ tableLayout: 'fixed' }} width="100%" height="100%" cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td>
                      <img 
                        className="lazyload" 
                        src={`/themes/${siteId}/blank.gif`} 
                        data-src={getLogoUrl(job.logo_dep)}
                        alt="Company Logo"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
          
          <td className="table-item item-valign-top">
            <span>{t("Location")}: </span>
            {cutcommusLocations(job.JOB_LOCATION_NAME)}
          </td>
          
          <td className="table-item item-valign-top">
            <span>{t("_Salary_")}: </span>
            {formatSalary(job.JOB_FROMSALARY, job.JOB_TOSALARY, job.JOB_SALARYUNIT)}
            {arrSalaryUnits[job.JOB_SALARYUNIT] && ` ${arrSalaryUnits[job.JOB_SALARYUNIT]}`}
          </td>
          
          <td className="table-item item-valign-top">
            <span>{t("_Job expiredate Date_")}: </span>
            {job.JOB_EXPIREDATE || t("_unlimited_")}
          </td>
        </tr>
      ))}
    </>
  );
}
