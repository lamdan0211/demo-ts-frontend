'use client';

import { useState, useEffect } from 'react';
import { JobsPageProps, Job, PaginationInfo } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';
import BoxSearch from '@/components/jobs/box_search';
import Col250Index from './col250/index';
import Header from '../common/_header';
import Footer from '../common/_footer';

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
    COMPANY_NAME: 'Tech Solutions Inc.',
    LOCATION: 'Ho Chi Minh City',
    SALARY: '2000-3000 USD',
    JOB_ACTIVE_DATE: '2024-01-15',
    JOB_DESCRIPTION: 'We are looking for a Senior Software Engineer to join our development team...',
    JOB_REQUIREMENTS: 'Bachelor degree in Computer Science, 5+ years experience...',
    JOB_BENEFITS: 'Competitive salary, health insurance, flexible working hours...'
  },
  {
    JOB_ID: 2,
    JOB_TITLE: 'Marketing Manager',
    COMPANY_NAME: 'Digital Marketing Co.',
    LOCATION: 'Hanoi',
    SALARY: '1500-2500 USD',
    JOB_ACTIVE_DATE: '2024-01-14',
    JOB_DESCRIPTION: 'Lead our marketing team and develop strategies for brand growth...',
    JOB_REQUIREMENTS: 'Marketing degree, 3+ years experience in digital marketing...',
    JOB_BENEFITS: 'Performance bonus, professional development opportunities...'
  },
  {
    JOB_ID: 3,
    JOB_TITLE: 'Business Analyst',
    COMPANY_NAME: 'Finance Group',
    LOCATION: 'Da Nang',
    SALARY: '1800-2800 USD',
    JOB_ACTIVE_DATE: '2024-01-13',
    JOB_DESCRIPTION: 'Analyze business processes and provide data-driven insights...',
    JOB_REQUIREMENTS: 'Business or Finance degree, strong analytical skills...',
    JOB_BENEFITS: 'Work from home options, comprehensive training...'
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
    currentPage: 1,
    totalPages: 1,
    totalItems: sampleJobs.length,
    itemsPerPage: 10
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
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        controller="jobs"
        action="index"
        arrMenuCates={arrMenuCates}
        currentUrl={`/${siteId}/jobs`}
        changeLangUrl={`/${siteId}/jobs?lang=${language === 'en' ? 'vi' : 'en'}`}
      />
      
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
                  onSearch={handleSearch}
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
                                  <a href={`/${siteId}/jobs/${job.JOB_ID}`} className="job-title-link">
                                    {job.JOB_TITLE}
                                  </a>
                                  {job.COMPANY_NAME && (
                                    <div className="company-name">{job.COMPANY_NAME}</div>
                                  )}
                                </td>
                                <td>{job.LOCATION ? cutLocations(job.LOCATION) : '-'}</td>
                                <td>{job.SALARY ? formatSalary(job.SALARY) : '-'}</td>
                                <td>{job.JOB_ACTIVE_DATE ? formatDate(job.JOB_ACTIVE_DATE) : '-'}</td>
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
                {pagination.totalPages > 1 && (
                  <div className="pagination-wrapper">
                    <nav>
                      <ul className="pagination">
                        <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                          <li key={page} className={`page-item ${pagination.currentPage === page ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
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
      
      <Footer 
        siteId={siteId} 
        footerMenuCates={[]}
        language={language}
      />
    </div>
  );
}
