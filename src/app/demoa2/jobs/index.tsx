'use client';

import { useState, useEffect } from 'react';
import { JobsPageProps, Job, PaginationInfo } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import BoxSearch from '@/components/jobs/box_search';
import Col250Index from './col250/index';

// Translation function
function t(key: string, language: 'vi' | 'en' = 'en'): string {
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
    },
    'title_jobs_page': {
      vi: 'Tìm việc làm',
      en: 'Find Jobs'
    },
    'title_jobs_description': {
      vi: 'Tìm kiếm việc làm phù hợp với kỹ năng và kinh nghiệm của bạn',
      en: 'Find jobs that match your skills and experience'
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

const formatSalary = (salary: string): string => {
  if (!salary) return '';
  return salary.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Sample job data for demoa2
const sampleJobs: Job[] = [
  {
    JOB_ID: 1,
    JOB_TITLE: 'Senior Software Engineer',
    LINK: '/demoa2/jobs/1',
    JOB_LOCATION_NAME: 'Ho Chi Minh City',
    JOB_SALARY_MIN: 2000,
    JOB_SALARY_MAX: 3000,
    JOB_ACTIVEDATE: '2024-01-15'
  },
  {
    JOB_ID: 2,
    JOB_TITLE: 'Marketing Manager',
    LINK: '/demoa2/jobs/2',
    JOB_LOCATION_NAME: 'Hanoi',
    JOB_SALARY_MIN: 1500,
    JOB_SALARY_MAX: 2500,
    JOB_ACTIVEDATE: '2024-01-14'
  },
  {
    JOB_ID: 3,
    JOB_TITLE: 'Business Analyst',
    LINK: '/demoa2/jobs/3',
    JOB_LOCATION_NAME: 'Da Nang',
    JOB_SALARY_MIN: 1800,
    JOB_SALARY_MAX: 2800,
    JOB_ACTIVEDATE: '2024-01-13'
  }
];

export default function JobsPage({
  siteId,
  arrRwInfo,
  arrEmployer,
  arrMenuCates = [],
  language = 'en'
}: JobsPageProps) {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    pageCount: 1,
    pagesInRange: [1]
  });

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  const constants = siteConfig.constants;

  // Handle search
  const handleSearch = (searchParams: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  return (
    <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="jobs-content">
                <h1 className="page-title">{t('title_jobs_page', language)}</h1>
                <p className="page-description">{t('title_jobs_description', language)}</p>
                
                {/* Search Box */}
                <BoxSearch
                  siteId={siteId}
                  arrIndustries={[]}
                  getAllLocateCountry={[]}
                  arrParam={{}}
                  language={language}
                />
              
              </div>
            </div>
            
          
          </div>
          <div className="row" style={{width: '100%', gap: '50px'}}>
              <div className='col-md-8'>
                  
                {/* Jobs List */}
                <div className="jobs-list">
                  {loading ? (
                    <div className="loading">Loading jobs...</div>
                  ) : jobs && jobs.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>{t('_No._', language)}</th>
                            <th>{t('Job Title', language)}</th>
                            <th>{t('Location', language)}</th>
                            <th>{t('_Salary_', language)}</th>
                            <th>{t('_Job Active Date_', language)}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobs.map((job, index) => {
                            // Check if job has required properties before rendering
                            if (!job?.JOB_ID || !job?.JOB_TITLE) {
                              return null;
                            }
                            
                            return (
                              <tr key={job.JOB_ID}>
                                <td>{index + 1}</td>
                                <td>
                                  <a href={job.LINK} className="job-title-link">
                                    {job.JOB_TITLE}
                                  </a>
                                </td>
                                <td>{job.JOB_LOCATION_NAME ? cutLocations(job.JOB_LOCATION_NAME) : '-'}</td>
                                <td>
                                  {job.JOB_SALARY_MIN && job.JOB_SALARY_MAX 
                                    ? `${job.JOB_SALARY_MIN} - ${job.JOB_SALARY_MAX} USD`
                                    : job.JOB_SALARY_MIN 
                                    ? `From ${job.JOB_SALARY_MIN} USD`
                                    : job.JOB_SALARY_MAX
                                    ? `Up to ${job.JOB_SALARY_MAX} USD`
                                    : 'Negotiable'
                                  }
                                </td>
                                <td>{job.JOB_ACTIVEDATE ? formatDate(job.JOB_ACTIVEDATE) : '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>{t('msg_nodata_lstjob', language)}</p>
                    </div>
                  )}
                </div>
                
                {/* Pagination */}
                {pagination.pageCount > 1 && (
                  <div className="pagination-wrapper">
                    <nav>
                      <ul className="pagination">
                        <li className={`page-item ${pagination.current === 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(pagination.current - 1)}
                            disabled={pagination.current === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {pagination.pagesInRange.map(page => (
                          <li key={page} className={`page-item ${pagination.current === page ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${pagination.current === pagination.pageCount ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(pagination.current + 1)}
                            disabled={pagination.current === pagination.pageCount}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <Col250Index
                  siteId={siteId}
                  language={language}
                />
            </div>
          </div>
        </div>
      </div>
  );
}
