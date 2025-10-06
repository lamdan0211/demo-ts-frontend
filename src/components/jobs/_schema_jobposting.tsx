'use client';

import React from 'react';

// Types
interface JobInfo {
  JOB_TITLE: string;
  JOB_CONTENT: string;
  JOB_LASTMODIFY: string;
  JOB_NO_DEADLINE: number;
  JOB_ACTIVEDATE: string;
  JOB_EXPIREDATE?: string;
  REQUISITION_EMPLOYMENT_TYPE?: string;
  JOB_INDUSTRIES: string;
  JOB_SALARYUNIT: string;
  JOB_FROMSALARY: number;
  JOB_TOSALARY: number;
  JOB_LOCATIONS: string;
  COUNTRY_NAME?: string;
  JOB_EXPERIENCE_FROM?: number;
  JOB_REQUIRESKILL: string;
  JOB_QUALIFICATION?: number;
  OWNER: string;
}

interface Employer {
  EMP_NAME: string;
  EMP_ID: number;
  EMP_ADDRESS: string;
  LOCATION_ID?: number;
  COUNTRY_ID?: number;
}

interface RewriteInfo {
  RW_LOGO: string;
}

interface Benefit {
  BENEFIT_NAME: string;
}

interface SchemaJobPostingProps {
  arrJobInfo: JobInfo;
  arrEmployer: Employer;
  arrRwInfo: RewriteInfo;
  arrLstBenefit?: Benefit[];
  arrJobTag?: string[];
  arrSalaryUnits: Record<string, string>;
  arrCurrency: string[];
  siteId?: string;
  language: string;
}

export default function SchemaJobPosting({
  arrJobInfo,
  arrEmployer,
  arrRwInfo,
  arrLstBenefit,
  arrJobTag,
  arrSalaryUnits,
  arrCurrency,
  siteId = 'demoa1',
  language = 'vi'
}: SchemaJobPostingProps) {

  // Helper functions
  const stripTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  };

  const regexReplace = (text: string, pattern: string, replacement: string): string => {
    return text.replace(new RegExp(pattern, 'g'), replacement);
  };

  const cleanText = (text: string): string => {
    return regexReplace(stripTags(text), '["\']', '');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const calDateExpired = (dateString: string): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 30); // Add 30 days
    return date.toISOString().split('T')[0];
  };

  const toEnDate = (dateString: string): string => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateString;
  };

  const getEmploymentType = (type?: string): string => {
    switch (type) {
      case '1000': return 'FULL_TIME';
      case '0100': return 'PART_TIME';
      case '0010': return 'CONTRACTOR';
      default: return 'INTERN';
    }
  };

  const getCurrency = (): string => {
    if (arrJobInfo.JOB_SALARYUNIT === 'vnd' || 
        arrJobInfo.JOB_SALARYUNIT === 'usd' || 
        arrCurrency.includes(arrJobInfo.JOB_SALARYUNIT)) {
      return arrSalaryUnits[arrJobInfo.JOB_SALARYUNIT]?.toUpperCase() || 'VND';
    }
    return 'VND';
  };

  const getSalaryValue = () => {
    if (arrJobInfo.JOB_SALARYUNIT === 'vnd' || 
        arrJobInfo.JOB_SALARYUNIT === 'usd' || 
        arrCurrency.includes(arrJobInfo.JOB_SALARYUNIT)) {
      
      if (arrJobInfo.JOB_FROMSALARY > 0 && arrJobInfo.JOB_TOSALARY === 0) {
        return `"value":"${arrJobInfo.JOB_FROMSALARY}"`;
      } else if (arrJobInfo.JOB_FROMSALARY === 0 && arrJobInfo.JOB_TOSALARY > 0) {
        return `"value":"${arrJobInfo.JOB_TOSALARY}"`;
      } else {
        return `"minValue":"${arrJobInfo.JOB_FROMSALARY}","maxValue":"${arrJobInfo.JOB_TOSALARY}"`;
      }
    } else if (arrJobInfo.JOB_SALARYUNIT === 'ltt' || arrJobInfo.JOB_SALARYUNIT === 'lct') {
      return `"value":"${arrSalaryUnits[arrJobInfo.JOB_SALARYUNIT]}"`;
    } else {
      return `"value":"${arrSalaryUnits[arrJobInfo.JOB_SALARYUNIT]}"`;
    }
  };

  const getValidThrough = (): string => {
    if (arrJobInfo.JOB_NO_DEADLINE === 1) {
      return calDateExpired(arrJobInfo.JOB_ACTIVEDATE);
    } else if (arrJobInfo.JOB_EXPIREDATE) {
      return toEnDate(arrJobInfo.JOB_EXPIREDATE);
    }
    return calDateExpired(arrJobInfo.JOB_ACTIVEDATE);
  };

  const getJobBenefits = (): string => {
    if (arrLstBenefit && arrLstBenefit.length > 0) {
      return arrLstBenefit.map(benefit => benefit.BENEFIT_NAME).join(', ');
    }
    return '';
  };

  const getSkills = (): string => {
    if (arrJobTag && arrJobTag.length > 0) {
      return arrJobTag.join(', ');
    }
    return '';
  };

  const getCountryName = (): string => {
    if (arrJobInfo.COUNTRY_NAME) {
      return arrJobInfo.COUNTRY_NAME;
    }
    return language === 'vi' ? 'Việt Nam' : 'Viet Nam';
  };

  const getLocationString = (): string => {
    let location = '';
    if (arrEmployer.LOCATION_ID) {
      location += `${arrEmployer.LOCATION_ID}, `;
    }
    if (arrEmployer.COUNTRY_ID) {
      location += `${arrEmployer.COUNTRY_ID}`;
    }
    return location;
  };

  const getDegree = (qualification?: number): string => {
    // This would need to be implemented based on your degree mapping
    return qualification ? `Degree ${qualification}` : '';
  };

  const getJobLevel = (levelId: number): string => {
    // This would need to be implemented based on your job level mapping
    return `Level ${levelId}`;
  };

  const getIndustries = (industries: string): string => {
    // This would need to be implemented based on your industry mapping
    return industries;
  };

  const getLocations = (locations: string): string => {
    // This would need to be implemented based on your location mapping
    return locations;
  };

  // Generate the JSON-LD schema
  const generateSchema = () => {
    const schema = {
      "@context": "http://schema.org",
      "@type": "JobPosting",
      "title": arrJobInfo.JOB_TITLE,
      "description": cleanText(arrJobInfo.JOB_CONTENT),
      "identifier": {
        "@type": "PropertyValue",
        "name": arrEmployer.EMP_NAME,
        "value": arrEmployer.EMP_ID.toString(16) // Convert to hex
      },
      "datePosted": formatDate(arrJobInfo.JOB_LASTMODIFY),
      "validThrough": getValidThrough(),
      "employmentType": [getEmploymentType(arrJobInfo.REQUISITION_EMPLOYMENT_TYPE)],
      "hiringOrganization": {
        "@type": "Organization",
        "name": arrEmployer.EMP_NAME,
        "sameAs": `${window.location.protocol}//${window.location.host}`,
        "logo": `/themes/${siteId}/images/${arrRwInfo.RW_LOGO}`
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": arrEmployer.EMP_ADDRESS,
          "addressLocality": getLocationString(),
          "addressRegion": getLocations(arrJobInfo.JOB_LOCATIONS),
          "addressCountry": getCountryName(),
          "postalCode": "70000"
        }
      },
      "industry": getIndustries(arrJobInfo.JOB_INDUSTRIES),
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": getCurrency(),
        "value": {
          "@type": "QuantitativeValue",
          ...JSON.parse(`{${getSalaryValue()},"unitText":"MONTH"}`)
        }
      },
      "occupationalCategory": getJobLevel(arrJobInfo.LEVEL_ID),
      "workHours": "8AM-5PM"
    };

    // Add optional fields
    if (arrLstBenefit && arrLstBenefit.length > 0) {
      schema.jobBenefits = getJobBenefits();
    }

    if (['rod', 'demo', 'hrvietnam'].includes(arrJobInfo.OWNER)) {
      schema.experienceRequirements = {
        "@type": "OccupationalExperienceRequirements",
        "description": cleanText(arrJobInfo.JOB_REQUIRESKILL)
      };

      if (arrJobInfo.JOB_EXPERIENCE_FROM && arrJobInfo.JOB_EXPERIENCE_FROM > 0) {
        schema.experienceRequirements.monthsOfExperience = arrJobInfo.JOB_EXPERIENCE_FROM;
      }
    }

    if (['rod', 'demo', 'hrvietnam'].includes(arrJobInfo.OWNER) && arrJobInfo.JOB_QUALIFICATION) {
      schema.educationRequirements = {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": getDegree(arrJobInfo.JOB_QUALIFICATION)
      };
    }

    if (arrJobInfo.JOB_QUALIFICATION) {
      schema.qualifications = getDegree(arrJobInfo.JOB_QUALIFICATION);
    }

    if (arrJobTag && arrJobTag.length > 0) {
      schema.skills = getSkills();
    }

    return schema;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema(), null, 2)
      }}
    />
  );
}
