'use client';

import React from 'react';

interface Job {
  JOB_TITLE: string;
  LINK: string;
  JOB_LOCATION_NAME: string;
  JOB_SALARYUNIT: string;
  JOB_FROMSALARY: number;
  JOB_TOSALARY: number;
  JOB_EXPIREDATE: string;
  JOB_BENEFITS?: string;
  DEP_ID?: number;
  logo_dep?: string;
}

interface Benefit {
  BENEFIT_ID: number;
  BENEFIT_NAME: string;
  BENEFIT_ICON: string;
}

interface IndexListJobP31Props {
  indexBackground: number;
  language?: 'vi' | 'en';
  arrJobs?: Job[];
  showLogoListJob?: boolean;
  linkLogoListJob?: string;
  listJobIndexCss?: string;
  currency?: string;
  arrSalaryUnits?: { [key: string]: string };
  arrLstBenefit?: Benefit[];
  LINK_JOBS?: string;
  STATIC_TN?: string;
  IMAGES_TN?: string;
  t?: (key: string) => string;
}

export default function IndexListJobP31({
  indexBackground,
  language = 'vi',
  arrJobs = [],
  showLogoListJob = false,
  linkLogoListJob = '',
  listJobIndexCss = '',
  currency = 'vnd',
  arrSalaryUnits = {},
  arrLstBenefit = [],
  LINK_JOBS = '/jobs',
  STATIC_TN = '/static',
  IMAGES_TN = '/images',
  t = (key: string) => key
}: IndexListJobP31Props) {
  // Sample data for demonstration
  const sampleJobs: Job[] = [
    {
      JOB_TITLE: 'Kỹ sư sản xuất thép',
      LINK: '/hoasen/jobs/steel-engineer',
      JOB_LOCATION_NAME: 'Hồ Chí Minh',
      JOB_SALARYUNIT: 'vnd',
      JOB_FROMSALARY: 15000000,
      JOB_TOSALARY: 25000000,
      JOB_EXPIREDATE: '2024-12-31',
      JOB_BENEFITS: '1,2,3,4',
      DEP_ID: 1,
      logo_dep: 'hoasen-logo.png'
    },
    {
      JOB_TITLE: 'Chuyên viên kỹ thuật',
      LINK: '/hoasen/jobs/technical-specialist',
      JOB_LOCATION_NAME: 'Hà Nội',
      JOB_SALARYUNIT: 'vnd',
      JOB_FROMSALARY: 12000000,
      JOB_TOSALARY: 20000000,
      JOB_EXPIREDATE: '2024-12-25',
      JOB_BENEFITS: '1,2,5',
      DEP_ID: 2
    },
    {
      JOB_TITLE: 'Quản lý sản xuất',
      LINK: '/hoasen/jobs/production-manager',
      JOB_LOCATION_NAME: 'Bình Dương',
      JOB_SALARYUNIT: 'vnd',
      JOB_FROMSALARY: 20000000,
      JOB_TOSALARY: 35000000,
      JOB_EXPIREDATE: '2024-12-20',
      JOB_BENEFITS: '1,2,3,4,5',
      DEP_ID: 3
    }
  ];

  const jobs = arrJobs.length > 0 ? arrJobs : sampleJobs;

  const formatSalary = (fromSalary: number, toSalary: number, unit: string) => {
    const formattedFrom = fromSalary.toLocaleString('vi-VN');
    const formattedTo = toSalary.toLocaleString('vi-VN');
    
    if (unit === 'vnd') {
      return `${formattedFrom} - ${formattedTo}`;
    }
    return `${formattedFrom} - ${formattedTo}`;
  };

  const getJobBenefits = (jobBenefits: string) => {
    if (!jobBenefits || !arrLstBenefit.length) return [];
    
    const benefitIds = jobBenefits.split(',').map(id => parseInt(id.trim()));
    return arrLstBenefit
      .filter(benefit => benefitIds.includes(benefit.BENEFIT_ID))
      .slice(0, 4);
  };

  const getLogoUrl = (job: Job) => {
    if (job.logo_dep) {
      return `${IMAGES_TN}/rws/department/${job.logo_dep}`;
    }
    if (linkLogoListJob && linkLogoListJob !== '_link_logo_list_job_') {
      return linkLogoListJob;
    }
    return `${IMAGES_TN}/logo-default.png`;
  };

  if (!jobs.length) return null;

  return (
    <div 
      className={`section-page section-jobs ${indexBackground % 2 === 1 ? 'bg-odd' : ''}`}
      style={listJobIndexCss ? { [listJobIndexCss]: true } : {}}
    >
      <div className="container">
        <header>
          <h2 className="section-title">{t('_featured_jobs_')}</h2>
        </header>
        <div className="component-body">
          <table className="table" id="lstJob">
            <thead className={language}>
              <tr>
                <th className="table-header-1">{t('Job Title')}</th>
                <th className="table-header-2">{t('Location')}</th>
                <th className="table-header-3">{t('_Salary_')}</th>
                <th className="table-header-4">{t('_Job expiredate Date_')}</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => {
                const jobBenefits = getJobBenefits(job.JOB_BENEFITS || '');
                
                return (
                  <tr key={index}>
                    <td className="table-item table-item-title">
                      <a href={job.LINK} title={job.JOB_TITLE} className="table-item--link">
                        <h4 className="table-item--title-heading">{job.JOB_TITLE}</h4>
                      </a>
                      {showLogoListJob && (
                        <div className="col-xs-12 company-logo">
                          <table style={{ tableLayout: 'fixed', width: '100%', height: '100%' }} cellSpacing="0" cellPadding="0">
                            <tbody>
                              <tr>
                                <td>
                                  <img 
                                    className="lazyload" 
                                    src={`${STATIC_TN}/blank.gif`} 
                                    data-src={getLogoUrl(job)}
                                    alt="Company Logo"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {job.JOB_BENEFITS && jobBenefits.length > 0 && (
                        <ul className="list-benefits">
                          {jobBenefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex}>
                              <i className={`fa ${benefit.BENEFIT_ICON}`}></i> {t(benefit.BENEFIT_NAME)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="table-item item-valign-top">
                      <span>{t('Location')}: </span>
                      {job.JOB_LOCATION_NAME}
                    </td>
                    <td className="table-item item-valign-top">
                      <span>{t('_Salary_')}: </span>
                      {formatSalary(job.JOB_FROMSALARY, job.JOB_TOSALARY, job.JOB_SALARYUNIT)}
                      {arrSalaryUnits[job.JOB_SALARYUNIT] && ` ${arrSalaryUnits[job.JOB_SALARYUNIT]}`}
                    </td>
                    <td className="table-item item-valign-top">
                      <span>{t('_Job expiredate Date_')}: </span>
                      {job.JOB_EXPIREDATE || t('_unlimited_')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center component-footer">
            <a href={LINK_JOBS} className="btn btn-primary" title={t('_View_all_jobs_')}>
              {t('_View_all_jobs_')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}