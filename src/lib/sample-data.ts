import { FooterMenuCategory, MenuCategory, RewriteInfo, EmployerInfo, FeatureCareer, OwnerDetail } from './types';

export const demoa1FooterData: FooterMenuCategory[] = [
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 1,
    CATE_NAME: 'Trang chủ',
    CATE_LINK: '/',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 2,
    CATE_NAME: 'Tìm việc',
    CATE_LINK: '/jobs',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 2,
    CATE_CODE: 'about',
    CATE_ID: 3,
    CATE_NAME: 'Giới thiệu',
    CATE_LINK: '/demoa1/about',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 4,
    CATE_NAME: 'Liên hệ',
    CATE_LINK: '/demoa1/contact',
    CATE_LINKTARGET: '_self'
  }
];

// Header sample data
export const demoa1HeaderData = {
  arrRwInfo: {
    RW_LOGO: 'logo.png'
  } as RewriteInfo,
  arrEmployer: {
    EMP_NAME: 'Demo A1 Company'
  } as EmployerInfo,
  arrMenuCates: [
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 1,
      CATE_NAME: 'Trang chủ',
      CATE_LINK: '/',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'index',
      SUBURL_ACTION: 'index'
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 2,
      CATE_NAME: 'Tìm việc',
      CATE_LINK: '/jobs',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'jobs',
      SUBURL_ACTION: 'index',
      CHILDREN: [
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 21,
          CATE_NAME: 'Việc làm IT',
          CATE_LINK: '/jobs/it',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'jobs',
          SUBURL_ACTION: 'it'
        },
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 22,
          CATE_NAME: 'Việc làm Marketing',
          CATE_LINK: '/jobs/marketing',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'jobs',
          SUBURL_ACTION: 'marketing'
        }
      ]
    },
    {
      CATE_TYPE: 2,
      CATE_CODE: 'about',
      CATE_ID: 3,
      CATE_NAME: 'Giới thiệu',
      CATE_LINK: '/demoa1/about',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'about',
      SUBURL_ACTION: 'index'
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 4,
      CATE_NAME: 'Liên hệ',
      CATE_LINK: '/demoa1/contact',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'contact',
      SUBURL_ACTION: 'index'
    }
  ] as MenuCategory[],
  listFeatureCareer: [
    {
      FEATURE_CAREER_NAME: 'Lập trình viên',
      LINK: '/careers/developer'
    },
    {
      FEATURE_CAREER_NAME: 'Designer',
      LINK: '/careers/designer'
    }
  ] as FeatureCareer[]
};

// Contact sample data
export const demoa1ContactData = {
  detailOwner: {
    EMP_DESC: 'Chúng tôi là công ty hàng đầu trong lĩnh vực công nghệ thông tin, chuyên cung cấp các giải pháp phần mềm và dịch vụ IT chất lượng cao.',
    EMP_ADDRESS: '123 Đường ABC, Quận 1, TP.HCM',
    LOCATION_ID: 1,
    COUNTRY_ID: 1,
    EMP_TEL: '+84 28 1234 5678',
    EMP_FAX: '+84 28 1234 5679',
    EMP_EMAIL: 'contact@demoa1.com'
  } as OwnerDetail,
  strCaptcha: 'ABC123'
};

// Index page sample data
export const demoa1IndexData = {
  arrRwInfo: {
    RW_BANNER: 'banner1.jpg;banner2.jpg;banner3.jpg'
  } as RewriteInfo,
  arrIndustries: [
    { INDUSTRY_ID: 1, INDUSTRY_NAME: 'Công nghệ thông tin', LINK: '/it', JOB_INDUSTRY_NUM: 150 },
    { INDUSTRY_ID: 2, INDUSTRY_NAME: 'Tài chính - Ngân hàng', LINK: '/finance', JOB_INDUSTRY_NUM: 89 },
    { INDUSTRY_ID: 3, INDUSTRY_NAME: 'Bán hàng - Marketing', LINK: '/sales', JOB_INDUSTRY_NUM: 120 },
    { INDUSTRY_ID: 4, INDUSTRY_NAME: 'Nhân sự', LINK: '/hr', JOB_INDUSTRY_NUM: 45 },
    { INDUSTRY_ID: 5, INDUSTRY_NAME: 'Kế toán - Kiểm toán', LINK: '/accounting', JOB_INDUSTRY_NUM: 67 }
  ] as Industry[],
  arrLocations: [
    { LOCATION_ID: 1, LOCATION_NAME: 'Hồ Chí Minh', LINK: '/hcm', JOB_LOCATION_NUM: 200 },
    { LOCATION_ID: 2, LOCATION_NAME: 'Hà Nội', LINK: '/hanoi', JOB_LOCATION_NUM: 150 },
    { LOCATION_ID: 3, LOCATION_NAME: 'Đà Nẵng', LINK: '/danang', JOB_LOCATION_NUM: 80 },
    { LOCATION_ID: 4, LOCATION_NAME: 'Cần Thơ', LINK: '/cantho', JOB_LOCATION_NUM: 45 },
    { LOCATION_ID: 5, LOCATION_NAME: 'Hải Phòng', LINK: '/haiphong', JOB_LOCATION_NUM: 30 }
  ] as Location[]
};

// Jobs page sample data
export const demoa1JobsData = {
  arrJobs: [
    {
      JOB_ID: 1,
      JOB_TITLE: 'Senior Frontend Developer',
      JOB_LOCATION_NAME: 'Hồ Chí Minh, Hà Nội',
      JOB_SALARY_MIN: 15,
      JOB_SALARY_MAX: 25,
      JOB_ACTIVEDATE: '2024-01-15',
      JOB_TOPLISTING: true,
      LINK: '/jobs/1',
      RECNO: 1
    },
    {
      JOB_ID: 2,
      JOB_TITLE: 'Backend Developer (Node.js)',
      JOB_LOCATION_NAME: 'Hà Nội',
      JOB_SALARY_MIN: 12,
      JOB_SALARY_MAX: 20,
      JOB_ACTIVEDATE: '2024-01-14',
      JOB_TOPLISTING: false,
      LINK: '/jobs/2',
      RECNO: 2
    },
    {
      JOB_ID: 3,
      JOB_TITLE: 'Full Stack Developer',
      JOB_LOCATION_NAME: 'Đà Nẵng',
      JOB_SALARY_MIN: 10,
      JOB_SALARY_MAX: 18,
      JOB_ACTIVEDATE: '2024-01-13',
      JOB_TOPLISTING: false,
      LINK: '/jobs/3',
      RECNO: 3
    },
    {
      JOB_ID: 4,
      JOB_TITLE: 'DevOps Engineer',
      JOB_LOCATION_NAME: 'Hồ Chí Minh',
      JOB_SALARY_MIN: 18,
      JOB_SALARY_MAX: 30,
      JOB_ACTIVEDATE: '2024-01-12',
      JOB_TOPLISTING: true,
      LINK: '/jobs/4',
      RECNO: 4
    },
    {
      JOB_ID: 5,
      JOB_TITLE: 'UI/UX Designer',
      JOB_LOCATION_NAME: 'Hà Nội, Cần Thơ',
      JOB_SALARY_MIN: 8,
      JOB_SALARY_MAX: 15,
      JOB_ACTIVEDATE: '2024-01-11',
      JOB_TOPLISTING: false,
      LINK: '/jobs/5',
      RECNO: 5
    }
  ] as Job[],
  pages: {
    current: 1,
    pageCount: 5,
    previous: undefined,
    next: 2,
    pagesInRange: [1, 2, 3, 4, 5]
  },
  arrIndustries: [
    { INDUSTRY_ID: 1, INDUSTRY_NAME: 'Công nghệ thông tin', LINK: '/it', JOB_INDUSTRY_NUM: 150 },
    { INDUSTRY_ID: 2, INDUSTRY_NAME: 'Tài chính - Ngân hàng', LINK: '/finance', JOB_INDUSTRY_NUM: 89 },
    { INDUSTRY_ID: 3, INDUSTRY_NAME: 'Bán hàng - Marketing', LINK: '/sales', JOB_INDUSTRY_NUM: 120 },
    { INDUSTRY_ID: 4, INDUSTRY_NAME: 'Nhân sự', LINK: '/hr', JOB_INDUSTRY_NUM: 45 },
    { INDUSTRY_ID: 5, INDUSTRY_NAME: 'Kế toán - Kiểm toán', LINK: '/accounting', JOB_INDUSTRY_NUM: 67 }
  ] as Industry[],
  getAllLocateCountry: [
    {
      COUNTRY_ID: 1,
      NAME: 'Việt Nam',
      LOCATION: [
        { LOCATION_ID: 1, LOCATION_NAME: 'Hồ Chí Minh', LINK: '/hcm', JOB_LOCATION_NUM: 200 },
        { LOCATION_ID: 2, LOCATION_NAME: 'Hà Nội', LINK: '/hanoi', JOB_LOCATION_NUM: 150 },
        { LOCATION_ID: 3, LOCATION_NAME: 'Đà Nẵng', LINK: '/danang', JOB_LOCATION_NUM: 80 }
      ]
    }
  ],
  arrParam: {
    q: '',
    cat: '',
    loc: ''
  },
  arrInfo: null,
  arrFunction: {
    OFF_JOIN_TALENT_NETWORK: false
  }
};
