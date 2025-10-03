// Footer menu category types (alias for MenuCategory)
export type FooterMenuCategory = MenuCategory;

// Site configuration
export interface SiteConfig {
  id: string;
  name: string;
  language: 'vi' | 'en';
  layoutType?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  };
  constants: {
    TN: string;
    JSK: string;
    LANGUAGE: string;
    LINK_RW_IMAGES: string;
    LINK_RESUME: string;
    LINK_JOBS: string;
    LINK_JOBS_SEARCH: string;
    LINK_ALL_JOBS: string;
  };
}

// Menu category types (for both header and footer)
export interface MenuCategory {
  CATE_TYPE: number;
  CATE_CODE: string;
  CATE_ID: number;
  CATE_NAME: string;
  CATE_LINK: string;
  CATE_LINKTARGET?: string;
  SUBURL_ID?: number;
  SUBURL_VALUE?: string;
  SUBURL_CONTROLLER?: string;
  SUBURL_ACTION?: string;
  CHILDREN?: MenuCategory[];
}

// Employer info
export interface EmployerInfo {
  EMP_NAME: string;
}

// User info
export interface UserInfo {
  JOBSEEKER_FIRSTNAME: string;
}

// Rewrite info
export interface RewriteInfo {
  RW_LOGO: string;
}

// Feature career
export interface FeatureCareer {
  FEATURE_CAREER_NAME: string;
  LINK: string;
}

// Footer component props
export interface FooterProps {
  siteId: string;
  footerMenuCates?: FooterMenuCategory[];
  language?: 'vi' | 'en';
  arrRwInfo?: RewriteInfo;
  arrEmployer?: EmployerInfo;
}

// Header component props
export interface HeaderProps {
  siteId: string;
  arrRwInfo?: RewriteInfo;
  arrEmployer?: EmployerInfo;
  arrInfo?: UserInfo;
  controller?: string;
  arrMenuCates?: MenuCategory[];
  language?: 'vi' | 'en';
  action?: string;
  listFeatureCareer?: FeatureCareer[];
  currentUrl?: string;
  changeLangUrl?: string;
  newsCateParent?: number;
}

// Owner detail
export interface OwnerDetail {
  EMP_DESC: string;
  EMP_ADDRESS: string;
  LOCATION_ID?: number;
  COUNTRY_ID?: number;
  EMP_TEL: string;
  EMP_FAX: string;
  EMP_EMAIL: string;
}

// Message types
export type MessageType = 'success' | 'error' | 'warning' | 'info';

// Contact component props
export interface ContactProps {
  siteId: string;
  msg?: string;
  msgType?: MessageType;
  detailOwner?: OwnerDetail;
  strCaptcha: string;
  language?: 'vi' | 'en';
  arrRwInfo?: RewriteInfo;
  arrEmployer?: EmployerInfo;
  arrMenuCates?: MenuCategory[];
}

// Executive component props
export interface ExecutiveProps {
  siteId: string;
  language?: 'vi' | 'en';
}

// Outsourcing component props
export interface OutsourcingProps {
  siteId: string;
  language?: 'vi' | 'en';
}

// SourceScreen component props
export interface SourceScreenProps {
  siteId: string;
  language?: 'vi' | 'en';
}

// TranslateJs component props
export interface TranslateJsProps {
  siteId: string;
  language?: 'vi' | 'en';
}

// Industry API data
export interface IndustryApi {
  INDUSTRY_ID: number;
  INDUSTRY_NAME: string;
  SEARCH_URL: string;
  INDUSTRY_ACTIVEDJOB: number;
}

// Index news data
export interface IndexNews {
  NEWS_CONTENT: string;
}

// Box Industry Custom Homepage props
export interface BoxIndustryCustomHomepageProps {
  siteId: string;
  arrIndustryApi?: IndustryApi[];
  arrIndexNews?: IndexNews;
  language?: 'vi' | 'en';
}

// Social Network data
export interface SocialNetwork {
  SO_NETWORK_ID: number;
  SO_NETWORK_OWNER_STATUS: number;
}

// Box Social Share props
export interface BoxSocialShareProps {
  siteId: string;
  arrListSoNetwork?: SocialNetwork[];
  language?: 'vi' | 'en';
}

// Job data
export interface Job {
  JOB_TITLE: string;
  LINK: string;
  JOB_SALARY_MIN?: number;
  JOB_SALARY_MAX?: number;
  JOB_TOPLISTING?: boolean;
  JOB_ID?: number;
  RECNO?: number;
  JOB_LOCATION_NAME?: string;
  JOB_ACTIVEDATE?: string;
}

// Box Career props
export interface BoxCareerProps {
  siteId: string;
  arrJobs?: Job[];
  jobNum?: number;
  language?: 'vi' | 'en';
}

// Social Network Follow data
export interface SocialNetworkFollow {
  SO_NETWORK_ID: number;
  SO_NETWORK_OWNER_STATUS: number;
  SO_NETWORK_LINK: string;
}

// Box Social Follow props
export interface BoxSocialFollowProps {
  siteId: string;
  arrListSoNetwork?: SocialNetworkFollow[];
  language?: 'vi' | 'en';
}

// Survey Answer data
export interface SurveyAnswer {
  ANSWER_ID: number;
  ANSWER_CONTENT: string;
  ANSWER_VOTE: number;
}

// Survey data
export interface Survey {
  QUESTION_ID: number;
  QUESTION_CONTENT: string;
  ANSWERS: SurveyAnswer[];
}

// Survey Subject data
export interface SurveySubject {
  SUBJECT_ID: number;
  SUBJECT_TITLE: string;
}

// Function settings
export interface FunctionSettings {
  SURVEY_BOX?: boolean;
  MULTI_SURVEY_BOX?: boolean;
}

// Box Survey props
export interface BoxSurveyProps {
  siteId: string;
  arrFunction?: FunctionSettings;
  arrSurvey?: Survey | SurveySubject[];
  csrfToken?: string;
  language?: 'vi' | 'en';
}

// Industry data for horizontal display
export interface Industry {
  INDUSTRY_ID: number;
  INDUSTRY_NAME: string;
  LINK: string;
  JOB_INDUSTRY_NUM: number;
}

// Box Horizontal Industries props
export interface BoxHorizontalIndustriesProps {
  siteId: string;
  arrIndustries?: Industry[];
  language?: 'vi' | 'en';
}

// Index page props
export interface IndexPageProps {
  siteId: string;
  arrRwInfo?: RewriteInfo;
  arrIndustries?: Industry[];
  arrLocations?: Location[];
  language?: 'vi' | 'en';
}

// Pagination info
export interface PaginationInfo {
  current: number;
  pageCount: number;
  previous?: number;
  next?: number;
  pagesInRange: number[];
}

// Box Search props
export interface BoxSearchProps {
  siteId: string;
  arrIndustries?: Industry[];
  getAllLocateCountry?: Array<{
    COUNTRY_ID: number;
    NAME: string;
    LOCATION: Location[];
  }>;
  arrParam?: {
    q?: string;
    cat?: string;
    loc?: string;
  };
  language?: 'vi' | 'en';
}

// Col250 props
export interface Col250Props {
  siteId: string;
  arrBoxIndustries?: Industry[];
  arrLocations?: Location[];
  arrInfo?: any;
  arrListSoNetwork?: SocialNetwork[];
  arrSimilarJobs?: Job[];
  currentUrl?: string;
  language?: 'vi' | 'en';
}

// Jobs page props
export interface JobsPageProps {
  siteId: string;
  arrJobs?: Job[];
  pages?: PaginationInfo;
  linkParams?: string;
  arrIndustries?: Industry[];
  getAllLocateCountry?: Array<{
    COUNTRY_ID: number;
    NAME: string;
    LOCATION: Location[];
  }>;
  arrRwInfo?: RewriteInfo;
  arrEmployer?: EmployerInfo;
  arrMenuCates?: MenuCategory[];
  arrInfo?: any;
  arrFunction?: any;
  language?: 'vi' | 'en';
  arrParam?: {
    q?: string;
    cat?: string;
    loc?: string;
  };
  arrInfo?: any;
  arrFunction?: {
    OFF_JOIN_TALENT_NETWORK?: boolean;
  };
  language?: 'vi' | 'en';
}

// Box Upload CV props
export interface BoxUploadCvProps {
  siteId: string;
  arrInfo?: any;
  currentUrl?: string;
}

// Box Social Fanpage props
export interface BoxSocialFanpageProps {
  arrListSoNetwork?: SocialNetwork[];
}

// Box Similar Jobs props
export interface BoxSimilarJobsProps {
  arrSimilarJobs?: Job[];
  language?: 'vi' | 'en';
}

// Col250 Detail props (for job detail page)
export interface Col250DetailProps {
  siteId: string;
  arrInfo?: any;
  arrListSoNetwork?: SocialNetwork[];
  arrSimilarJobs?: Job[];
  currentUrl?: string;
  language?: 'vi' | 'en';
}

// Col250 Index props (for jobs listing page)
export interface Col250IndexProps {
  siteId: string;
  arrBoxIndustries?: Industry[];
  arrLocations?: Location[];
  arrInfo?: any;
  arrListSoNetwork?: SocialNetwork[];
  currentUrl?: string;
  language?: 'vi' | 'en';
}

// Employer page props
export interface EmployerPageProps {
  siteId: string;
}

// Box Media props
export interface BoxMediaProps {
  siteId: string;
  controller?: string;
  action?: string;
  cateId?: string;
}

// Box Search Jobs props
export interface BoxSearchJobsProps {
  siteId: string;
  language?: 'vi' | 'en';
}

// Col250 Box props (for news pages)
export interface Col250BoxProps {
  siteId: string;
  controller?: string;
  action?: string;
  cateId?: string;
  arrInfo?: any;
  currentUrl?: string;
  arrFunction?: {
    SURVEY_BOX?: boolean;
    MULTI_SURVEY_BOX?: boolean;
  };
  arrSurvey?: Survey | SurveySubject[];
  csrfToken?: string;
  language?: 'vi' | 'en';
}
