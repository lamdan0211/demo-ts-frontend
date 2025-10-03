'use client';

import { useState, useEffect } from 'react';
import { JobsPageProps, Job, PaginationInfo } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import BoxSearch from '@/components/jobs/box_search';
import Col250Index from './col250/index';
import Header from '../common/_header';
import Footer from '../common/_footer';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_No._': {
      vi: 'STT',
      en: 'No.'
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
    '_Job Active Date_': {
      vi: 'Ngày đăng',
      en: 'Job Active Date'
    },
    'msg_nodata_lstjob': {
      vi: 'Không có dữ liệu việc làm',
      en: 'No job data available'
    },
    'msg_nodata_lstjob_nouser': {
      vi: 'Bạn chưa tham gia mạng lưới tài năng. [LINK_JOIN] để tham gia ngay!',
      en: 'You have not joined the talent network. [LINK_JOIN] to join now!'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Utility functions
const cutLocations = (location: string): string => {
  if (!location) return '';
  const locations = location.split(',');
  return locations.length > 2 ? locations.slice(0, 2).join(', ') + '...' : location;
};

const getSalary = (job: Job): string => {
  if (!job.JOB_SALARY_MIN && !job.JOB_SALARY_MAX) return 'Thỏa thuận';
  
  const min = job.JOB_SALARY_MIN ? job.JOB_SALARY_MIN.toLocaleString() : '';
  const max = job.JOB_SALARY_MAX ? job.JOB_SALARY_MAX.toLocaleString() : '';
  
  if (min && max) return `${min} - ${max} triệu`;
  if (min) return `Từ ${min} triệu`;
  if (max) return `Đến ${max} triệu`;
  
  return 'Thỏa thuận';
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

export default function JobsPage({ 
  siteId, 
  arrJobs = [], 
  pages, 
  linkParams = '', 
  arrIndustries = [], 
  getAllLocateCountry = [], 
  arrParam = {},
  arrInfo,
  arrFunction,
  language = 'vi',
  arrRwInfo,
  arrEmployer,
  arrMenuCates
}: JobsPageProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  // Generate pagination links
  const generatePageLink = (page: number): string => {
    const separator = linkParams.includes('?') ? '&' : '?';
    return `${linkParams}${separator}page=${page}`;
  };

  // Check if user has permission to join talent network
  const canJoinTalentNetwork = !arrInfo && !arrFunction?.OFF_JOIN_TALENT_NETWORK;

  return (
    <>
      <Header 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        arrMenuCates={arrMenuCates}
        language={language}
      />
      <div id="main-content">
      <BoxSearch
        siteId={siteId}
        arrIndustries={arrIndustries}
        getAllLocateCountry={getAllLocateCountry}
        arrParam={arrParam}
        language={language}
      />
      
      <div id="col709">
        <div className="con_lrGroup">
          {/* Top Pagination */}
          {pages && pages.pageCount > 1 && (
            <ul id="jb_pagination" className="fl_right mar_bottom10">
              {pages.previous && (
                <li className="previous">
                  <a href={generatePageLink(pages.previous)}>&nbsp;</a>
                </li>
              )}
              {pages.pagesInRange.map((page) => (
                <li key={page} className={pages.current === page ? 'active' : ''}>
                  {pages.current === page ? (
                    page
                  ) : (
                    <a href={generatePageLink(page)}>{page}</a>
                  )}
                </li>
              ))}
              {pages.next && (
                <li className="next">
                  <a href={generatePageLink(pages.next)}>&nbsp;</a>
                </li>
              )}
            </ul>
          )}

          {/* Jobs Table */}
          <table 
            width="100%" 
            cellPadding="0" 
            cellSpacing="0" 
            className={`tblJob ${arrJobs[0]?.JOB_TOPLISTING ? 'tbl_top_listing' : ''}`} 
            id="tbl_job_listing"
          >
            <thead>
              <tr className="bgcolor_theme header">
                <td width="8%" align="center">{t('_No._', language)}</td>
                <td>{t('Job Title', language)}</td>
                <td width="18%" className="pad_left15">{t('Location', language)}</td>
                <td width="26%" className="pad_left15">{t('_Salary_', language)}</td>
                <td width="20%" align="center">{t('_Job Active Date_', language)}</td>
              </tr>
            </thead>
            <tbody>
              {arrJobs.length > 0 ? (
                arrJobs.map((job, index) => (
                  <tr 
                    key={job.JOB_ID}
                    className={`record ${index % 2 !== 0 ? 'bg' : ''} ${job.JOB_TOPLISTING ? 'top_listing' : ''} ${hoveredRow === index ? 'hover' : ''}`}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td align="center" valign="top">
                      {job.RECNO || index + 1}
                    </td>
                    <td valign="top">
                      <a href={job.LINK} title={job.JOB_TITLE}>
                        {job.JOB_TITLE}
                      </a>
                    </td>
                    <td className="pad_left15" valign="top">
                      {cutLocations(job.JOB_LOCATION_NAME || '')}
                    </td>
                    <td className="pad_left15" valign="top">
                      {getSalary(job)}
                    </td>
                    <td align="center" valign="top">
                      {formatDate(job.JOB_ACTIVEDATE || '')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="record">
                  <td colSpan={5} align="center">
                    {t('msg_nodata_lstjob', language)}
                    {canJoinTalentNetwork && (
                      <span dangerouslySetInnerHTML={{
                        __html: t('msg_nodata_lstjob_nouser', language).replace(
                          '[LINK_JOIN]', 
                          `<a href="/demoa1/join">${t('_Join_', language)}</a>`
                        )
                      }} />
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Bottom Pagination */}
          {pages && pages.pageCount > 1 && (
            <ul id="jb_pagination" className="fl_right mar_top10">
              {pages.previous && (
                <li className="previous">
                  <a href={generatePageLink(pages.previous)}>&nbsp;</a>
                </li>
              )}
              {pages.pagesInRange.map((page) => (
                <li key={page} className={pages.current === page ? 'active' : ''}>
                  {pages.current === page ? (
                    page
                  ) : (
                    <a href={generatePageLink(page)}>{page}</a>
                  )}
                </li>
              ))}
              {pages.next && (
                <li className="next">
                  <a href={generatePageLink(pages.next)}>&nbsp;</a>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
      </div>

      <Col250Index
        siteId={siteId}
        arrBoxIndustries={arrIndustries}
        arrLocations={[]} // TODO: Pass actual locations data
        arrInfo={arrInfo}
        arrListSoNetwork={[]} // TODO: Pass actual social networks data
        currentUrl="/demoa1/jobs"
        language={language}
      />

      <Footer 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        language={language}
      />
    </>
  );
}
