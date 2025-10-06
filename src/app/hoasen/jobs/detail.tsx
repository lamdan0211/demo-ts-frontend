'use client';

import React, { useEffect } from 'react';
import { useTranslations } from '@/lib/use-translations';

// Types
interface JobDetailProps {
  arrJobInfo: {
    JOB_ID: number;
    JOB_TITLE: string;
    JOB_BANNER?: string;
    JOB_LOCATIONS: string;
    LEVEL_ID: number;
    REQUISITION_EMPLOYMENT_TYPE?: number;
    JOB_QUALIFICATION?: number;
    JOB_EXPERIENCE?: number;
    JOB_EXPERIENCE_FROM?: number;
    JOB_EXPERIENCE_TO?: number;
    JOB_FROMSALARY: number;
    JOB_TOSALARY: number;
    JOB_SALARYUNIT: string;
    JOB_INDUSTRIES: string;
    JOB_NO_DEADLINE: number;
    JOB_EXPIREDATE?: string;
    JOB_CHECK_EXTERNAL_APPLY: number;
    JOB_EXTERNAL_APPLY_LINK?: string;
    JOB_CONTENT: string;
    JOB_REQUIRESKILL: string;
    IS_EXPIRED: number;
  };
  arrLocationChose?: Record<string, string[]>;
  arrJobType: Record<number, string>;
  arrSalaryUnits: Record<string, string>;
  arrDepInfo?: {
    DEP_NAME: string;
  };
  arrOptionJob: {
    work_from_home: number;
  };
  arrFunction: {
    OFF_JOIN_TALENT_NETWORK: number;
    EXTERNAL_APPLY_LINK: number;
  };
  arrInfo?: any;
  isAppliedJob: boolean;
  arrListSoNetwork: Record<number, {
    SO_NETWORK_OWNER_STATUS: number;
  }>;
  arrJobBenefit?: number[];
  arrLstBenefit: Array<{
    BENEFIT_ID: number;
    BENEFIT_ICON: string;
    BENEFIT_NAME: string;
  }>;
  arrJobTag?: string[];
  arrParam: {
    dep: number;
  };
  currentUrl: string;
  siteId?: string;
  language: string;
}

export default function JobDetail({
  arrJobInfo,
  arrLocationChose,
  arrJobType,
  arrSalaryUnits,
  arrDepInfo,
  arrOptionJob,
  arrFunction,
  arrInfo,
  isAppliedJob,
  arrListSoNetwork,
  arrJobBenefit,
  arrLstBenefit,
  arrJobTag,
  arrParam,
  currentUrl,
  siteId = 'hoasen',
  language = 'vi'
}: JobDetailProps) {
  const t = useTranslations(language);

  // Helper functions
  const formatSalary = (from: number, to: number, unit: string) => {
    const arrCurrency = t('_currency_').split(',');
    if (unit === 'vnd' || unit === 'usd' || arrCurrency.includes(unit) || unit === t('_currency_')) {
      return `${from.toLocaleString()} - ${to.toLocaleString()}`;
    }
    return '';
  };

  const handleApplyClick = () => {
    if (arrJobInfo.IS_EXPIRED === 1) {
      alert((window as any).language?.msg_job_is_expired || 'Job is expired');
    } else if (isAppliedJob) {
      alert((window as any).language?.msg_job_is_applied || 'Job is already applied');
    } else if (arrJobInfo.JOB_CHECK_EXTERNAL_APPLY === 1 && arrJobInfo.JOB_EXTERNAL_APPLY_LINK && arrFunction.EXTERNAL_APPLY_LINK === 1) {
      window.open(arrJobInfo.JOB_EXTERNAL_APPLY_LINK, '_blank');
    } else {
      window.location.href = `/demoa1/jobs/apply/?id=${arrJobInfo.JOB_ID}`;
    }
  };

  const handleSaveJob = () => {
    if (!arrInfo) {
      // Redirect to login
      window.location.href = '/demoa1/login';
    } else {
      // Call saveJob function
      (window as any).saveJob?.(arrJobInfo.JOB_ID);
    }
  };

  const shareLink = (platform: string) => {
    // Implement share functionality
    console.log(`Sharing to ${platform}`);
  };

  const getBannerImage = () => {
    if (arrJobInfo.JOB_BANNER) {
      return `/themes/${siteId}/images/${arrJobInfo.JOB_BANNER}`;
    } else if (t(`_jobs_detail_dep_${arrParam.dep}`) && t(`_jobs_detail_dep_${arrJobInfo.LEVEL_ID}`) !== t(`_jobs_detail_dep_${arrJobInfo.LEVEL_ID}`)) {
      return t(`_jobs_detail_dep_${arrJobInfo.LEVEL_ID}`);
    } else if (t('_image_banner_job_detail_') && t('_image_banner_job_detail_') !== '_image_banner_job_detail_') {
      return t('_image_banner_job_detail_');
    } else {
      return `/themes/${siteId}/css/images/job/Banner${Math.floor(Math.random() * 4) + 1}.jpg`;
    }
  };

  // Scroll effect for job navigation
  useEffect(() => {
    const handleScroll = () => {
      const headerWidth = document.querySelector('div.header')?.clientHeight || 0;
      const jobNav = document.getElementById('job-nav');
      if (jobNav) {
        if (window.scrollY > headerWidth) {
          jobNav.classList.add('open');
        } else {
          jobNav.classList.remove('open');
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Docked Navigation */}
      <div className="docked-nav job hidden-xs" id="job-nav">
        <div className="container">
          <div className="docked-title">
            <h3>{arrJobInfo.JOB_TITLE}</h3>
          </div>
          <div className="docked-ctas">
            {!arrFunction.OFF_JOIN_TALENT_NETWORK && (
              <div className="favorite-container">
                <a 
                  href={!arrInfo ? '/demoa1/login' : 'javascript:void(0)'} 
                  className={`favorite ${!arrInfo ? 'showDialogD' : ''}`}
                  onClick={!arrInfo ? undefined : handleSaveJob}
                >
                  <i className="fa fa-heart-o"></i>
                </a>
              </div>
            )}
            <a 
              href="javascript:void(0)" 
              className="btn btn-primary apply-external" 
              onClick={handleApplyClick}
              disabled={arrJobInfo.IS_EXPIRED === 1 || isAppliedJob}
            >
              {arrJobInfo.IS_EXPIRED === 1 || isAppliedJob ? t('_Job Applied_') : t('_Apply_')} 
              <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Banner Area */}
      <div id="photo-area">
        <div id="banner-video">
          <div className="filter-video"></div>
          <div className="texton top-job-detail">
            <h1>{arrJobInfo.JOB_TITLE}</h1>
            <div className="ctas text-center">
              <a 
                href="javascript:void(0)" 
                onClick={handleApplyClick}
                className="btn btn-primary btn-block apply-external hidden-xs"
                disabled={arrJobInfo.IS_EXPIRED === 1 || isAppliedJob}
              >
                {arrJobInfo.IS_EXPIRED === 1 || isAppliedJob ? t('_Job Applied_') : t('_Apply_')} 
                <i aria-hidden="true" className="fa fa-long-arrow-right"></i>
              </a>
            </div>   
          </div>
          <div 
            id="bgvid" 
            style={{
              backgroundImage: `url(${getBannerImage()})`
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-page job-individual">
        <div className="container">
          <div className="job-side-section sidebar-content">
            <h3>{t('_About This Job_')}</h3>
            <div className="metadata metadata-list">
              {/* Working Place */}
              <div className="metadata-list_section metadata-list_section--blue">
                <h4 className="metadata-list_header">{t("working_place")}</h4>
                <ul className="metadata-list_items">
                  <li>
                    {arrLocationChose ? (
                      Object.entries(arrLocationChose).map(([key, value], index, array) => (
                        <span key={key}>
                          {key} {value && `(${value.join(', ')})`}
                          {index < array.length - 1 && ', '}
                        </span>
                      ))
                    ) : (
                      arrJobInfo.JOB_LOCATIONS
                    )}
                  </li>
                </ul>
              </div>

              {/* Job Level */}
              <div className="metadata-list_section metadata-list_section--orange">
                <h4 className="metadata-list_header">{t("Job Level")}</h4>
                <ul className="metadata-list_items">
                  <li>{arrJobInfo.LEVEL_ID}</li>
                </ul>
              </div>

              {/* Job Type */}
              {arrJobInfo.REQUISITION_EMPLOYMENT_TYPE && (
                <div className="metadata-list_section metadata-list_section--orange">
                  <h4 className="metadata-list_header">{t("_Job Type_")}</h4>
                  <ul className="metadata-list_items">
                    <li>{arrJobType[arrJobInfo.REQUISITION_EMPLOYMENT_TYPE]}</li>
                  </ul>
                </div>
              )}

              {/* Qualification */}
              {arrJobInfo.JOB_QUALIFICATION && (
                <div className="metadata-list_section metadata-list_section--orange">
                  <h4 className="metadata-list_header">{t("_Qualification_")}</h4>
                  <ul className="metadata-list_items">
                    <li>{arrJobInfo.JOB_QUALIFICATION}</li>
                  </ul>
                </div>
              )}

              {/* Experience Range */}
              {arrJobInfo.JOB_EXPERIENCE !== null && (
                <div className="metadata-list_section metadata-list_section--orange">
                  <h4 className="metadata-list_header">{t("_Experience Range_")}</h4>
                  <ul className="metadata-list_items">
                    <li>
                      {arrJobInfo.JOB_EXPERIENCE_FROM && arrJobInfo.JOB_EXPERIENCE_TO 
                        ? `${arrJobInfo.JOB_EXPERIENCE_FROM} - ${arrJobInfo.JOB_EXPERIENCE_TO} years`
                        : arrJobInfo.JOB_EXPERIENCE
                      }
                    </li>
                  </ul>
                </div>
              )}

              {/* Job Salary */}
              <div className="metadata-list_section metadata-list_section--orange">
                <h4 className="metadata-list_header">{t("Job Salary")}</h4>
                <ul className="metadata-list_items">
                  <li>
                    {formatSalary(arrJobInfo.JOB_FROMSALARY, arrJobInfo.JOB_TOSALARY, arrJobInfo.JOB_SALARYUNIT)} 
                    {arrSalaryUnits[arrJobInfo.JOB_SALARYUNIT]}
                  </li>
                </ul>
              </div>

              {/* Category */}
              <div className="metadata-list_section metadata-list_section--orange">
                <h4 className="metadata-list_header">{t("Category")}</h4>
                <ul className="metadata-list_items">
                  <li>{arrJobInfo.JOB_INDUSTRIES}</li>
                </ul>
              </div>

              {/* Department */}
              {arrDepInfo && (
                <div className="metadata-list_section metadata-list_section--orange">
                  <h4 className="metadata-list_header">{t("_Department_")}</h4>
                  <ul className="metadata-list_items">
                    <li>{arrDepInfo.DEP_NAME}</li>
                  </ul>
                </div>
              )}

              {/* Work Type */}
              {arrOptionJob.work_from_home === 1 && (
                <div className="metadata-list_section metadata-list_section--orange">
                  <h4 className="metadata-list_header">{t("_work_type_")}</h4>
                  <ul className="metadata-list_items">
                    <li>{t("_work_from_home_")}</li>
                  </ul>
                </div>
              )}

              {/* Deadline to Apply */}
              <div className="metadata-list_section metadata-list_section--orange">
                <h4 className="metadata-list_header">{t("Deadline to Apply")}</h4>
                <ul className="metadata-list_items">
                  <li>
                    {arrJobInfo.JOB_NO_DEADLINE === 1 ? t('_Unlimited_') : arrJobInfo.JOB_EXPIREDATE}
                  </li>
                </ul>
              </div>
            </div>

            {/* Save Job */}
            {!arrFunction.OFF_JOIN_TALENT_NETWORK && (
              <div className="favorite-box-container">
                <a 
                  href={!arrInfo ? '/demoa1/login' : 'javascript:void(0)'} 
                  className={`favorite ${!arrInfo ? 'showDialogD' : ''}`}
                  onClick={!arrInfo ? undefined : handleSaveJob}
                >
                  <i className="fa fa-heart-o"></i> {t('_Save For Later_')}
                </a>
              </div>
            )}

            {/* Social Share */}
            {((arrListSoNetwork[1]?.SO_NETWORK_OWNER_STATUS === 1) || 
              (arrListSoNetwork[2]?.SO_NETWORK_OWNER_STATUS === 1) || 
              (arrListSoNetwork[4]?.SO_NETWORK_OWNER_STATUS === 1) || 
              (arrListSoNetwork[5]?.SO_NETWORK_OWNER_STATUS === 1)) && (
              <div className="grey-buttons companies" id="share">
                {arrListSoNetwork[1]?.SO_NETWORK_OWNER_STATUS === 1 && (
                  <div className="icon-wrapper fb-lg">
                    <a href="javascript:void(0)" onClick={() => shareLink('facebook')} className="btn-greyscale facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </div>
                )}
                {arrListSoNetwork[4]?.SO_NETWORK_OWNER_STATUS === 1 && (
                  <div className="icon-wrapper">
                    <a href="javascript:void(0)" onClick={() => shareLink('twitter')} className="btn-greyscale twitter">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </div>
                )}
                {arrListSoNetwork[2]?.SO_NETWORK_OWNER_STATUS === 1 && (
                  <div className="icon-wrapper">
                    <a href="javascript:void(0)" onClick={() => shareLink('linkedin')} className="btn-greyscale linkedin">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                )}
                {arrListSoNetwork[5]?.SO_NETWORK_OWNER_STATUS === 1 && (
                  <div className="icon-wrapper">
                    <a href="javascript:void(0)" onClick={() => shareLink('google')} className="btn-greyscale google">
                      <i className="fa fa-google"></i>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Useful Links */}
            <div className="col-lg-12 useful-links">
              <h3>{t('_Useful Links_')}</h3>
              <ul>
                <li>
                  <a href="/demoa1/jobs/all#label_location">
                    <i className="fa fa-chevron-left"></i> {t("_Jobs by Location_")}
                  </a>
                </li>
                <li>
                  <a href="/demoa1/jobs/all#label_industry">
                    <i className="fa fa-chevron-left"></i> {t("_Jobs by Industry_")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Survey */}
            <div className="col-xs-12 survey-talent">
              {/* Include survey component */}
            </div>

            {/* Custom Box */}
            {t("box_job_cb_left") && t("box_job_cb_left") !== 'box_job_cb_left' && (
              <div dangerouslySetInnerHTML={{ __html: t("box_job_cb_left") }} />
            )}
          </div>

          {/* Main Job Content */}
          <div className="job-main-section">
            <div className="job-body">
              <div className="job-post">
                <div className="job-post-description">
                  {/* Job Benefits */}
                  {arrJobBenefit && (
                    <>
                      <h2>{t("_Job Benefit_")}</h2>
                      <div>	
                        <ul className="list-benefits">
                          {arrLstBenefit.map((benefit) => {
                            if (arrJobBenefit.includes(benefit.BENEFIT_ID)) {
                              return (
                                <li key={benefit.BENEFIT_ID}>
                                  <i className={`fa ${benefit.BENEFIT_ICON}`}></i> {t(benefit.BENEFIT_NAME)}
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Job Description */}
                  <h2>{t("Job Description")}</h2>
                  <div className="content_fck" dangerouslySetInnerHTML={{ __html: arrJobInfo.JOB_CONTENT }} />

                  {/* Job Requirements */}
                  <h2>{t("Job Requirement")}</h2>
                  <div className="content_fck" dangerouslySetInnerHTML={{ __html: arrJobInfo.JOB_REQUIRESKILL }} />

                  {/* Job Tags */}
                  {arrJobTag && (
                    <div className="tagskilldetail">
                      <span>{t("_Job Tag_")}:</span>
                      {arrJobTag.map((tag, index) => (
                        <a 
                          key={index}
                          href={`/demoa1/tag/${encodeURIComponent(tag)}.html`} 
                          title={tag}
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Apply Button */}
                <div className="bottom-ctas">
                  <div className="external-apply center">
                    <a 
                      href="javascript:void(0)" 
                      onClick={handleApplyClick}
                      className="btn btn-primary btn-block apply-external"
                      disabled={arrJobInfo.IS_EXPIRED === 1 || isAppliedJob}
                    >
                      {arrJobInfo.IS_EXPIRED === 1 || isAppliedJob ? t('_Job Applied_') : t('_Apply_')} 
                      <i className="fa fa-long-arrow-right"></i>
                    </a>
                    {!arrInfo && !arrFunction.OFF_JOIN_TALENT_NETWORK && (
                      <p className="notready">
                        <a href={`/demoa1/join?url=${currentUrl}`} className="showDialogD">
                          {t("Not ready to apply?")}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Jobs and Schema */}
      {/* Include similar jobs component */}
      {/* Include schema component */}
    </>
  );
}
