'use client';

import { useState, useEffect } from 'react';

interface Col250IndexProps {
  siteId: string;
  language: 'vi' | 'en';
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    'title_related_jobs': {
      vi: 'Việc làm liên quan',
      en: 'Related Jobs'
    },
    'title_job_categories': {
      vi: 'Danh mục việc làm',
      en: 'Job Categories'
    },
    'title_locations': {
      vi: 'Địa điểm',
      en: 'Locations'
    },
    'title_salary_ranges': {
      vi: 'Mức lương',
      en: 'Salary Ranges'
    },
    'view_all': {
      vi: 'Xem tất cả',
      en: 'View All'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function Col250Index({ siteId, language }: Col250IndexProps) {
  const [activeTab, setActiveTab] = useState('categories');

  // Sample data
  const jobCategories = [
    { id: 1, name: 'Information Technology', count: 45 },
    { id: 2, name: 'Marketing', count: 32 },
    { id: 3, name: 'Finance', count: 28 },
    { id: 4, name: 'Human Resources', count: 15 },
    { id: 5, name: 'Sales', count: 38 }
  ];

  const locations = [
    { id: 1, name: 'Ho Chi Minh City', count: 89 },
    { id: 2, name: 'Hanoi', count: 67 },
    { id: 3, name: 'Da Nang', count: 34 },
    { id: 4, name: 'Can Tho', count: 23 },
    { id: 5, name: 'Hai Phong', count: 18 }
  ];

  const salaryRanges = [
    { id: 1, range: 'Under $500', count: 12 },
    { id: 2, range: '$500 - $1000', count: 45 },
    { id: 3, range: '$1000 - $2000', count: 78 },
    { id: 4, range: '$2000 - $3000', count: 56 },
    { id: 5, range: 'Over $3000', count: 34 }
  ];

  const relatedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'HCMC' },
    { id: 2, title: 'Backend Developer', company: 'Startup Inc', location: 'Hanoi' },
    { id: 3, title: 'Full Stack Developer', company: 'Digital Agency', location: 'Da Nang' },
    { id: 4, title: 'DevOps Engineer', company: 'Cloud Solutions', location: 'HCMC' }
  ];

  return (
    <div className="sidebar-content">
      {/* Related Jobs */}
      <div className="box-related-jobs">
        <h3 className="box-title">{t('title_related_jobs', language)}</h3>
        <div className="related-jobs-list">
          {relatedJobs.map(job => (
            <div key={job.id} className="related-job-item">
              <a href={`/${siteId}/jobs/${job.id}`} className="job-link">
                {job.title}
              </a>
              <div className="job-meta">
                <span className="company">{job.company}</span>
                <span className="location">{job.location}</span>
              </div>
            </div>
          ))}
        </div>
        <a href={`/${siteId}/jobs`} className="view-all-link">
          {t('view_all', language)}
        </a>
      </div>

      {/* Job Categories */}
      <div className="box-job-categories">
        <h3 className="box-title">{t('title_job_categories', language)}</h3>
        <div className="categories-list">
          {jobCategories.map(category => (
            <div key={category.id} className="category-item">
              <a href={`/${siteId}/jobs?category=${category.id}`} className="category-link">
                {category.name}
                <span className="count">({category.count})</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="box-locations">
        <h3 className="box-title">{t('title_locations', language)}</h3>
        <div className="locations-list">
          {locations.map(location => (
            <div key={location.id} className="location-item">
              <a href={`/${siteId}/jobs?location=${location.id}`} className="location-link">
                {location.name}
                <span className="count">({location.count})</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Ranges */}
      <div className="box-salary-ranges">
        <h3 className="box-title">{t('title_salary_ranges', language)}</h3>
        <div className="salary-ranges-list">
          {salaryRanges.map(range => (
            <div key={range.id} className="salary-range-item">
              <a href={`/${siteId}/jobs?salary=${range.id}`} className="salary-range-link">
                {range.range}
                <span className="count">({range.count})</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
