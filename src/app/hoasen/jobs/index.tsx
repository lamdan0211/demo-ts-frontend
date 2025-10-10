'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface Job {
  JOB_TITLE: string;
  LINK: string;
  JOB_LOCATION_NAME: string;
  JOB_EXPIREDATE?: string;
  JOB_TOPLISTING?: number;
  logo_dep?: string;
  JOB_BENEFITS: number[];
  TOTAL: number;
}

interface Benefit {
  BENEFIT_ID: number;
  BENEFIT_ICON: string;
  BENEFIT_NAME: string;
}

interface PaginationInfo {
  pageCount: number;
  current: number;
  previous?: number;
  next?: number;
  pagesInRange: number[];
}

interface JobsIndexProps {
  arrJobs: Job[];
  arrParam: {
    q?: string;
    loc?: string;
    dep: number;
  };
  arrLstBenefit: Benefit[];
  pages?: PaginationInfo;
  linkParams: string;
  arrInfo?: any;
  is_mobile: boolean;
  siteId?: string;
  language: string;
}

export default function JobsIndex({
  arrJobs,
  arrParam,
  arrLstBenefit,
  pages,
  linkParams,
  arrInfo,
  is_mobile,
  siteId = 'hoasen',
  language = 'vi'
}: JobsIndexProps) {
  const t = useTranslations(language);
  const [isDataTableLoaded, setIsDataTableLoaded] = useState(false);

  // Helper functions
  const cutcommusLocations = (locations: string): string => {
    return locations.replace(/,/g, ', ');
  };

  const getBannerStyle = (): string => {
    if (is_mobile) {
      const mobileDepImage = t(`_mobile_search_jobs_dep_${arrParam.dep}`);
      const mobileImage = t('_mobile_search_jobs_image_');
      
      if (mobileDepImage && mobileDepImage !== `_mobile_search_jobs_dep_${arrParam.dep}`) {
        return mobileDepImage;
      } else if (mobileImage && mobileImage !== '_mobile_search_jobs_image_') {
        return mobileImage;
      }
    } else {
      const depImage = t(`_search_jobs_dep_${arrParam.dep}`);
      const defaultImage = t('_search_jobs_image_');
      
      if (depImage && depImage !== `_search_jobs_dep_${arrParam.dep}`) {
        return depImage;
      } else if (defaultImage) {
        return `background-image:url(${defaultImage})`;
      }
    }
    
    return '';
  };

  const getJobBenefits = (jobBenefits: number[]): Benefit[] => {
    return arrLstBenefit.filter(benefit => 
      jobBenefits.includes(benefit.BENEFIT_ID)
    ).slice(0, 4);
  };

  const getLogoUrl = (logoDep?: string): string => {
    if (logoDep) {
      return `/themes/${siteId}/images/rws/department/${logoDep}`;
    } else {
      const customLogo = t('_link_logo_list_job_');
      if (customLogo && customLogo !== '_link_logo_list_job_') {
        return customLogo;
      }
      return `/themes/${siteId}/images/logo-default.png`;
    }
  };

  const buildPaginationUrl = (page: number): string => {
    const separator = linkParams.includes('?') ? '&' : '?';
    return `${linkParams}${separator}page=${page}`;
  };

  // Initialize DataTable
  useEffect(() => {
    const initializeDataTable = async () => {
      if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn.DataTable) {
        if (isDataTableLoaded) {
          $('#lstJob').DataTable().destroy();
        }
        
        $('#lstJob').DataTable({
          paging: false,
          searching: false,
          info: false,
          aaSorting: []
        });
        
        setIsDataTableLoaded(true);
      }
    };

    if (arrJobs && arrJobs.length > 0) {
      initializeDataTable();
    }

    return () => {
      if (isDataTableLoaded && (window as any).$ && (window as any).$.fn.DataTable) {
        $('#lstJob').DataTable().destroy();
      }
    };
  }, [arrJobs, isDataTableLoaded]);

  // Social share toggle effect
  useEffect(() => {
    if ((window as any).$) {
      (window as any).$('span.genericButton').toggle(function() {
        (window as any).$(this).children('span.tpt_socialShareBar').fadeIn('slow');
      }, function() {
        (window as any).$(this).children('span.tpt_socialShareBar').fadeOut('slow');
      });
    }
  }, []);

  return (
    <>
      {/* Banner Area */}
      <div id="photo-area">
        <div id="banner-video">
          <div className="filter-video"></div>
          <div className="sub-heading">
            <h1>{t("_search_jobs_")}</h1>
            <h2>{t("_search_jobs_intro_")}</h2>              
          </div>
          <div 
            id="bgvid" 
            style={{ 
              backgroundImage: getBannerStyle().includes('background-image:') 
                ? getBannerStyle().replace('background-image:', '').replace('url(', '').replace(')', '')
                : undefined,
              ...(getBannerStyle().includes('background-image:') ? {} : { style: getBannerStyle() })
            }}
          ></div>
        </div>
        <div className="container-search">
          {/* Include search box component */}
          {/* <BoxSearchP31 /> */}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="section-page section-jobs">
        <div className="container">
          {arrJobs && arrJobs.length > 0 ? (
            <>
              <div className="col-xs-12 title-jobfound">
                <h1>
                  {t("_We found_")} <span>{arrJobs[0]?.TOTAL || arrJobs.length}</span> {t("_job_")}
                  {arrParam.q && ` ${t("_key_search_")} ${arrParam.q}`}
                  {arrParam.loc && ` ${t("_in_")} ${cutcommusLocations(arrParam.loc)}`}
                </h1>
              </div>
              <div className="component-body">
                <table className="table" id="lstJob">
                  <thead className={language}>
                    <tr>
                      <th className="table-header-1">{t("Job Title")}</th>
                      <th className="table-header-2">{t("Location")}</th>
                      <th className="table-header-3">{t("_Job expiredate Date_")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrJobs.map((job, index) => {
                      const jobBenefits = getJobBenefits(job.JOB_BENEFITS);
                      
                      return (
                        <tr 
                          key={index} 
                          className={job.JOB_TOPLISTING ? 'top_listing' : ''}
                        >
                          <td className="table-item table-item-title">
                            <a 
                              href={job.LINK} 
                              title={job.JOB_TITLE} 
                              className="table-item--link"
                            >
                              <h4 className="table-item--title-heading">{job.JOB_TITLE}</h4>
                            </a>
                            
                            {t('_show_logo_list_job_') && (
                              <div className="col-xs-12 company-logo">
                                <table style={{ tableLayout: 'fixed' }} width="100%" height="100%" cellSpacing="0" cellPadding="0">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <img src={getLogoUrl(job.logo_dep)} alt="Company Logo" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                            
                            <ul className="list-benefits">
                              {jobBenefits.map((benefit) => (
                                <li key={benefit.BENEFIT_ID}>
                                  <i className={`fa ${benefit.BENEFIT_ICON}`}></i> {t(benefit.BENEFIT_NAME)}
                                </li>
                              ))}
                            </ul>
                          </td>
                          
                          <td className="table-item item-valign-top">
                            <span>{t("Location")}: </span>
                            {cutcommusLocations(job.JOB_LOCATION_NAME)}
                          </td>
                          
                          <td className="table-item item-valign-top">
                            <span>{t("_Job expiredate Date_")}: </span>
                            {job.JOB_EXPIREDATE || t("_unlimited_")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pages && pages.pageCount > 1 && (
                <ul id="jb_pagination" className="fl_right mar_top10">
                  {pages.previous && (
                    <li className="previous">
                      <a href={buildPaginationUrl(pages.previous)}>&nbsp;</a>
                    </li>
                  )}
                  
                  {pages.pagesInRange.map((page) => (
                    <li key={page} className={pages.current === page ? 'active' : ''}>
                      {pages.current === page ? (
                        page
                      ) : (
                        <a href={buildPaginationUrl(page)}>{page}</a>
                      )}
                    </li>
                  ))}
                  
                  {pages.next && (
                    <li className="next">
                      <a href={buildPaginationUrl(pages.next)}>&nbsp;</a>
                    </li>
                  )}
                </ul>
              )}
            </>
          ) : (
            <div className="col-xs-12 title">
              <h1>
                <span>
                  {t("msg_nodata_lstjob")}
                  {!arrInfo && (
                    <span dangerouslySetInnerHTML={{
                      __html: t("msg_nodata_lstjob_nouser").replace(
                        '[LINK_JOIN]', 
                        '<a href="/hoasen/join">' + t("join") + '</a>'
                      )
                    }} />
                  )}
                </span>
              </h1>
            </div>
          )}

          {/* Custom Box */}
          {t("box_job_cb") && t("box_job_cb") !== 'box_job_cb' && (
            <div dangerouslySetInnerHTML={{ __html: t("box_job_cb") }} />
          )}
        </div>
      </div>
    </>
  );
}
