'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/lib/types';

interface JobDetailProps {
  siteId: string;
  jobId: string;
  arrRwInfo: any;
  arrEmployer: any;
  arrMenuCates: any[];
  language: 'vi' | 'en';
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    'job_description': {
      vi: 'Mô tả công việc',
      en: 'Job Description'
    },
    'job_requirements': {
      vi: 'Yêu cầu công việc',
      en: 'Job Requirements'
    },
    'job_benefits': {
      vi: 'Quyền lợi',
      en: 'Job Benefits'
    },
    'apply_now': {
      vi: 'Ứng tuyển ngay',
      en: 'Apply Now'
    },
    'save_job': {
      vi: 'Lưu việc làm',
      en: 'Save Job'
    },
    'share_job': {
      vi: 'Chia sẻ',
      en: 'Share'
    },
    'back_to_jobs': {
      vi: 'Quay lại danh sách việc làm',
      en: 'Back to Jobs'
    },
    'company_info': {
      vi: 'Thông tin công ty',
      en: 'Company Information'
    },
    'similar_jobs': {
      vi: 'Việc làm tương tự',
      en: 'Similar Jobs'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Sample job data
const sampleJobs: Record<string, Job> = {
  '1': {
    JOB_ID: 1,
    JOB_TITLE: 'Senior Software Engineer',
    COMPANY_NAME: 'Tech Solutions Inc.',
    LOCATION: 'Ho Chi Minh City',
    SALARY: '2000-3000 USD',
    JOB_ACTIVE_DATE: '2024-01-15',
    JOB_DESCRIPTION: 'We are looking for a Senior Software Engineer to join our development team. You will be responsible for designing, developing, and maintaining high-quality software solutions. This role offers the opportunity to work on cutting-edge technologies and collaborate with a talented team of developers.',
    JOB_REQUIREMENTS: '• Bachelor degree in Computer Science or related field\n• 5+ years of experience in software development\n• Proficiency in JavaScript, React, Node.js\n• Experience with cloud platforms (AWS, Azure)\n• Strong problem-solving and communication skills\n• Experience with Agile development methodologies',
    JOB_BENEFITS: '• Competitive salary package\n• Health insurance coverage\n• Flexible working hours\n• Remote work options\n• Professional development opportunities\n• Annual performance bonus\n• Team building activities'
  },
  '2': {
    JOB_ID: 2,
    JOB_TITLE: 'Marketing Manager',
    COMPANY_NAME: 'Digital Marketing Co.',
    LOCATION: 'Hanoi',
    SALARY: '1500-2500 USD',
    JOB_ACTIVE_DATE: '2024-01-14',
    JOB_DESCRIPTION: 'Lead our marketing team and develop strategies for brand growth. You will be responsible for creating and executing marketing campaigns, managing social media presence, and analyzing market trends to drive business growth.',
    JOB_REQUIREMENTS: '• Marketing degree or related field\n• 3+ years experience in digital marketing\n• Proficiency in Google Analytics, Facebook Ads\n• Strong analytical and creative skills\n• Experience with content management systems\n• Excellent communication and leadership skills',
    JOB_BENEFITS: '• Performance-based bonus\n• Professional development budget\n• Flexible work arrangements\n• Health and dental insurance\n• Paid time off\n• Company laptop and equipment\n• Team events and retreats'
  },
  '3': {
    JOB_ID: 3,
    JOB_TITLE: 'Business Analyst',
    COMPANY_NAME: 'Finance Group',
    LOCATION: 'Da Nang',
    SALARY: '1800-2800 USD',
    JOB_ACTIVE_DATE: '2024-01-13',
    JOB_DESCRIPTION: 'Analyze business processes and provide data-driven insights to support strategic decision making. You will work closely with stakeholders to identify opportunities for improvement and implement solutions that drive efficiency and growth.',
    JOB_REQUIREMENTS: '• Business or Finance degree\n• 3+ years experience in business analysis\n• Strong analytical and problem-solving skills\n• Proficiency in Excel, SQL, and data visualization tools\n• Experience with process improvement methodologies\n• Excellent communication and presentation skills',
    JOB_BENEFITS: '• Work from home options\n• Comprehensive training program\n• Career advancement opportunities\n• Health insurance\n• Performance incentives\n• Flexible schedule\n• Professional certification support'
  }
};

export default function JobDetail({ 
  siteId, 
  jobId, 
  arrRwInfo, 
  arrEmployer, 
  arrMenuCates, 
  language 
}: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const jobData = sampleJobs[jobId];
      setJob(jobData || null);
      setLoading(false);
    }, 500);
  }, [jobId]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="loading">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="main-content">
        <div className="container">
          <div className="error-message">
            <h1>Job Not Found</h1>
            <p>The job you are looking for does not exist.</p>
            <a href={`/${siteId}/jobs`} className="btn btn-primary">
              {t('back_to_jobs', language)}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="job-detail">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                  <a href={`/${siteId}`}>Home</a>
                  <span className="separator">/</span>
                  <a href={`/${siteId}/jobs`}>Jobs</a>
                  <span className="separator">/</span>
                  <span className="current">{job.JOB_TITLE}</span>
                </nav>

                {/* Job Header */}
                <div className="job-header">
                  <h1 className="job-title">{job.JOB_TITLE}</h1>
                  <div className="job-meta">
                    <div className="company-name">{job.COMPANY_NAME}</div>
                    <div className="job-location">{job.LOCATION}</div>
                    <div className="job-salary">{job.SALARY}</div>
                    <div className="job-date">Posted: {formatDate(job.JOB_ACTIVE_DATE)}</div>
                  </div>
                </div>

                {/* Job Actions */}
                <div className="job-actions">
                  <button className="btn btn-primary btn-apply">
                    {t('apply_now', language)}
                  </button>
                  <button className="btn btn-outline btn-save">
                    {t('save_job', language)}
                  </button>
                  <button className="btn btn-outline btn-share">
                    {t('share_job', language)}
                  </button>
                </div>

                {/* Job Description */}
                <div className="job-section">
                  <h2>{t('job_description', language)}</h2>
                  <div className="job-content">
                    {job.JOB_DESCRIPTION.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Job Requirements */}
                <div className="job-section">
                  <h2>{t('job_requirements', language)}</h2>
                  <div className="job-content">
                    <pre className="requirements-text">{job.JOB_REQUIREMENTS}</pre>
                  </div>
                </div>

                {/* Job Benefits */}
                <div className="job-section">
                  <h2>{t('job_benefits', language)}</h2>
                  <div className="job-content">
                    <pre className="benefits-text">{job.JOB_BENEFITS}</pre>
                  </div>
                </div>

                {/* Company Information */}
                <div className="job-section">
                  <h2>{t('company_info', language)}</h2>
                  <div className="company-info">
                    <h3>{job.COMPANY_NAME}</h3>
                    <p>We are a leading company in our industry, committed to innovation and excellence. Join our team and be part of our success story.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="sidebar">
                <div className="sidebar-box">
                  <h3>{t('similar_jobs', language)}</h3>
                  <div className="similar-jobs">
                    {Object.values(sampleJobs)
                      .filter(j => j.JOB_ID !== job.JOB_ID)
                      .slice(0, 3)
                      .map(similarJob => (
                        <div key={similarJob.JOB_ID} className="similar-job-item">
                          <a href={`/${siteId}/jobs/${similarJob.JOB_ID}`} className="similar-job-link">
                            {similarJob.JOB_TITLE}
                          </a>
                          <div className="similar-job-meta">
                            <span className="company">{similarJob.COMPANY_NAME}</span>
                            <span className="location">{similarJob.LOCATION}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
