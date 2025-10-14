import { FooterMenuCategory, MenuCategory, RewriteInfo, EmployerInfo, FeatureCareer, OwnerDetail } from './types';

export const demoa1FooterData: FooterMenuCategory[] = [
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 1,
    CATE_NAME: 'Trang chủ',
    CATE_LINK: '/demoa1',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 2,
    CATE_NAME: 'Tìm việc',
    CATE_LINK: '/demoa1/jobs',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 3,
    CATE_NAME: 'Tin tức',
    CATE_LINK: '/demoa1/news',
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

// Demoa2 Footer data
export const demoa2FooterData: FooterMenuCategory[] = [
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 1,
    CATE_NAME: 'Home',
    CATE_LINK: '/demoa2',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 2,
    CATE_NAME: 'Find Jobs',
    CATE_LINK: '/demoa2/jobs',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 3,
    CATE_NAME: 'News',
    CATE_LINK: '/demoa2/news',
    CATE_LINKTARGET: '_self'
  },
  {
    CATE_TYPE: 1,
    CATE_CODE: '',
    CATE_ID: 4,
    CATE_NAME: 'Contact',
    CATE_LINK: '/demoa2/contact',
    CATE_LINKTARGET: '_self'
  }
];

// Header sample data
export const demoa1HeaderData = {
  arrRwInfo: {
    RW_LOGO: 'logo.png',
    RW_BANNER: 'banner1.jpg;banner2.jpg;banner3.jpg'
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
      CATE_LINK: '/demoa1',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'index',
      SUBURL_ACTION: 'index'
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 2,
      CATE_NAME: 'Tìm việc',
      CATE_LINK: '/demoa1/jobs',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'jobs',
      SUBURL_ACTION: 'index',
      CHILDREN: [
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 21,
          CATE_NAME: 'Việc làm IT',
          CATE_LINK: '/demoa1/jobs/it',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'jobs',
          SUBURL_ACTION: 'it'
        },
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 22,
          CATE_NAME: 'Việc làm Marketing',
          CATE_LINK: '/demoa1/jobs/marketing',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'jobs',
          SUBURL_ACTION: 'marketing'
        }
      ]
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 3,
      CATE_NAME: 'Tin tức',
      CATE_LINK: '/demoa1/news',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'news',
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
      LINK: '/demoa1/careers/developer'
    },
    {
      FEATURE_CAREER_NAME: 'Designer',
      LINK: '/demoa1/careers/designer'
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

// Demoa2 Header data
export const demoa2HeaderData = {
  arrRwInfo: {
    RW_LOGO: 'logo.png'
  } as RewriteInfo,
  arrEmployer: {
    EMP_NAME: 'Demo A2 Company'
  } as EmployerInfo,
  arrMenuCates: [
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 1,
      CATE_NAME: 'Home',
      CATE_LINK: '/demoa2',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'index',
      SUBURL_ACTION: 'index'
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 2,
      CATE_NAME: 'Find Jobs',
      CATE_LINK: '/demoa2/jobs',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'jobs',
      SUBURL_ACTION: 'index',
      CHILDREN: [
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 21,
          CATE_NAME: 'IT Jobs',
          CATE_LINK: '/demoa2/jobs/it',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'jobs',
          SUBURL_ACTION: 'it'
        },
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 22,
          CATE_NAME: 'Marketing Jobs',
          CATE_LINK: '/demoa2/jobs/marketing',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'jobs',
          SUBURL_ACTION: 'marketing'
        }
      ]
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 3,
      CATE_NAME: 'News',
      CATE_LINK: '/demoa2/news',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'news',
      SUBURL_ACTION: 'index',
      CHILDREN: [
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 31,
          CATE_NAME: 'Technology News',
          CATE_LINK: '/demoa2/news/technology',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'news',
          SUBURL_ACTION: 'technology'
        },
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 32,
          CATE_NAME: 'Career Tips',
          CATE_LINK: '/demoa2/news/career-tips',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'news',
          SUBURL_ACTION: 'career-tips'
        },
        {
          CATE_TYPE: 1,
          CATE_CODE: '',
          CATE_ID: 33,
          CATE_NAME: 'Industry Updates',
          CATE_LINK: '/demoa2/news/industry-updates',
          CATE_LINKTARGET: '_self',
          SUBURL_CONTROLLER: 'news',
          SUBURL_ACTION: 'industry-updates'
        }
      ]
    },
    {
      CATE_TYPE: 1,
      CATE_CODE: '',
      CATE_ID: 4,
      CATE_NAME: 'Contact',
      CATE_LINK: '/demoa2/contact',
      CATE_LINKTARGET: '_self',
      SUBURL_CONTROLLER: 'contact',
      SUBURL_ACTION: 'index'
    }
  ] as MenuCategory[],
  listFeatureCareer: [
    {
      FEATURE_CAREER_NAME: 'Software Engineer',
      LINK: '/demoa2/careers/software-engineer'
    },
    {
      FEATURE_CAREER_NAME: 'Product Manager',
      LINK: '/demoa2/careers/product-manager'
    },
    {
      FEATURE_CAREER_NAME: 'UX Designer',
      LINK: '/demoa2/careers/ux-designer'
    }
  ] as FeatureCareer[]
};

// Demoa2 Index data
export const demoa2IndexData = {
  arrRwInfo: {
    RW_BANNER: 'banner1.jpg;banner2.jpg;banner3.jpg',
    RW_LOGO: 'logo.png'
  } as RewriteInfo,
  arrIndexNews: {
    NEWS_TITLE: 'Welcome to Demoa2 Job Portal',
    NEWS_CONTENT: '<p>Find your dream job with our comprehensive job search platform. We connect talented professionals with top companies worldwide.</p><p>Our platform offers advanced search features, career resources, and networking opportunities to help you succeed in your career journey.</p>'
  },
  arrIndustries: [
    { INDUSTRY_ID: 1, INDUSTRY_NAME: 'Information Technology', LINK: '/demoa2/jobs/it', JOB_INDUSTRY_NUM: 150 },
    { INDUSTRY_ID: 2, INDUSTRY_NAME: 'Finance - Banking', LINK: '/demoa2/jobs/finance', JOB_INDUSTRY_NUM: 89 },
    { INDUSTRY_ID: 3, INDUSTRY_NAME: 'Sales - Marketing', LINK: '/demoa2/jobs/sales', JOB_INDUSTRY_NUM: 120 },
    { INDUSTRY_ID: 4, INDUSTRY_NAME: 'Human Resources', LINK: '/demoa2/jobs/hr', JOB_INDUSTRY_NUM: 45 },
    { INDUSTRY_ID: 5, INDUSTRY_NAME: 'Accounting - Audit', LINK: '/demoa2/jobs/accounting', JOB_INDUSTRY_NUM: 67 }
  ] as { INDUSTRY_ID: number; INDUSTRY_NAME: string; LINK: string; JOB_INDUSTRY_NUM: number }[],
  arrLocations: [
    { LOCATION_ID: 1, LOCATION_NAME: 'Ho Chi Minh City', LINK: '/demoa2/jobs/hcm', JOB_LOCATION_NUM: 200 },
    { LOCATION_ID: 2, LOCATION_NAME: 'Hanoi', LINK: '/demoa2/jobs/hanoi', JOB_LOCATION_NUM: 150 },
    { LOCATION_ID: 3, LOCATION_NAME: 'Da Nang', LINK: '/demoa2/jobs/danang', JOB_LOCATION_NUM: 80 },
    { LOCATION_ID: 4, LOCATION_NAME: 'Can Tho', LINK: '/demoa2/jobs/cantho', JOB_LOCATION_NUM: 45 }
  ] as { LOCATION_ID: number; LOCATION_NAME: string; LINK: string; JOB_LOCATION_NUM: number }[]
};

// Index page sample data
export const demoa1IndexData = {
  arrRwInfo: {
    RW_BANNER: 'bgframe1.jpg;bgframe2.jpg;bgframe1.jpg',
    RW_LOGO: 'logo.png'
  } as RewriteInfo,
  arrIndustries: [
    { INDUSTRY_ID: 1, INDUSTRY_NAME: 'Công nghệ thông tin', LINK: '/it', JOB_INDUSTRY_NUM: 150 },
    { INDUSTRY_ID: 2, INDUSTRY_NAME: 'Tài chính - Ngân hàng', LINK: '/finance', JOB_INDUSTRY_NUM: 89 },
    { INDUSTRY_ID: 3, INDUSTRY_NAME: 'Bán hàng - Marketing', LINK: '/sales', JOB_INDUSTRY_NUM: 120 },
    { INDUSTRY_ID: 4, INDUSTRY_NAME: 'Nhân sự', LINK: '/hr', JOB_INDUSTRY_NUM: 45 },
    { INDUSTRY_ID: 5, INDUSTRY_NAME: 'Kế toán - Kiểm toán', LINK: '/accounting', JOB_INDUSTRY_NUM: 67 }
  ] as { INDUSTRY_ID: number; INDUSTRY_NAME: string; LINK: string; JOB_INDUSTRY_NUM: number }[],
  arrLocations: [
    { LOCATION_ID: 1, LOCATION_NAME: 'Hồ Chí Minh', LINK: '/hcm', JOB_LOCATION_NUM: 200 },
    { LOCATION_ID: 2, LOCATION_NAME: 'Hà Nội', LINK: '/hanoi', JOB_LOCATION_NUM: 150 },
    { LOCATION_ID: 3, LOCATION_NAME: 'Đà Nẵng', LINK: '/danang', JOB_LOCATION_NUM: 80 },
    { LOCATION_ID: 4, LOCATION_NAME: 'Cần Thơ', LINK: '/cantho', JOB_LOCATION_NUM: 45 },
    { LOCATION_ID: 5, LOCATION_NAME: 'Hải Phòng', LINK: '/haiphong', JOB_LOCATION_NUM: 30 }
  ] as { LOCATION_ID: number; LOCATION_NAME: string; LINK: string; JOB_LOCATION_NUM: number }[]
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
  ] as { JOB_ID: number; JOB_TITLE: string; JOB_LOCATION_NAME: string; JOB_SALARY_MIN: number; JOB_SALARY_MAX: number; JOB_ACTIVEDATE: string; JOB_TOPLISTING: boolean; LINK: string; RECNO: number }[],
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
  ] as { INDUSTRY_ID: number; INDUSTRY_NAME: string; LINK: string; JOB_INDUSTRY_NUM: number }[],
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

// Hoasen data
export const hoasenHeaderData = {
  arrRwInfo: {
    RW_LOGO: 'logo.png',
    RW_TITLE: 'Hoa Sen Group',
    RW_DESCRIPTION: 'Hoa Sen Group - Leading steel manufacturer in Vietnam'
  },
  arrEmployer: {
    EMP_NAME: 'Hoa Sen Group',
    RW_LOGO: 'logo.png'
  },
  arrMenuCates: [
    {
      CATE_ID: 1,
      CATE_NAME: 'Trang chủ',
      CATE_LINK: '/hoasen',
      CATE_TYPE: 1,
      CATE_LINKTARGET: '_self'
    },
    {
      CATE_ID: 2,
      CATE_NAME: 'Việc làm',
      CATE_LINK: '/hoasen/jobs',
      CATE_TYPE: 1,
      CATE_LINKTARGET: '_self',
      CHILDREN: [
        {
          CATE_ID: 21,
          CATE_NAME: 'Việc làm mới nhất',
          CATE_LINK: '/hoasen/jobs',
          CATE_TYPE: 1,
          CATE_LINKTARGET: '_self'
        },
        {
          CATE_ID: 22,
          CATE_NAME: 'Tìm kiếm việc làm',
          CATE_LINK: '/hoasen/jobs/search',
          CATE_TYPE: 1,
          CATE_LINKTARGET: '_self'
        },
        {
          CATE_ID: 23,
          CATE_NAME: 'Việc làm theo ngành',
          CATE_LINK: '/hoasen/jobs/by-industry',
          CATE_TYPE: 1,
          CATE_LINKTARGET: '_self'
        },
        {
          CATE_ID: 24,
          CATE_NAME: 'Việc làm theo địa điểm',
          CATE_LINK: '/hoasen/jobs/by-location',
          CATE_TYPE: 1,
          CATE_LINKTARGET: '_self'
        }
      ]
    },
    {
      CATE_ID: 3,
      CATE_NAME: 'Tin tức',
      CATE_LINK: '/hoasen/news',
      CATE_TYPE: 1,
      CATE_LINKTARGET: '_self'
    },
    {
      CATE_ID: 4,
      CATE_NAME: 'Về chúng tôi',
      CATE_LINK: '/hoasen/about',
      CATE_TYPE: 1,
      CATE_LINKTARGET: '_self'
    },
    {
      CATE_ID: 5,
      CATE_NAME: 'Liên hệ',
      CATE_LINK: '/hoasen/contact',
      CATE_TYPE: 1,
      CATE_LINKTARGET: '_self'
    }
  ],
  listFeatureCareer: [],
  CHANGE_LANG_URL: '/hoasen?lang=en'
};

export const hoasenIndexData = {
  arrRwInfo: {
    RW_LOGO: 'logo.png',
    RW_TITLE: 'Hoa Sen Group',
    RW_DESCRIPTION: 'Leading steel manufacturer in Vietnam',
    RW_BANNER_TOP: 'banner1.jpg;banner2.jpg;banner3.jpg',
    RW_BANNER: 'banner1.jpg;banner2.jpg;banner3.jpg'
  },
  arrIndustries: [
    {
      INDUSTRY_ID: 1,
      INDUSTRY_NAME: 'Sản xuất thép',
      LINK: '/hoasen/jobs?industry=1',
      JOB_INDUSTRY_NUM: 25
    },
    {
      INDUSTRY_ID: 2,
      INDUSTRY_NAME: 'Xây dựng',
      LINK: '/hoasen/jobs?industry=2',
      JOB_INDUSTRY_NUM: 18
    },
    {
      INDUSTRY_ID: 3,
      INDUSTRY_NAME: 'Cơ khí',
      LINK: '/hoasen/jobs?industry=3',
      JOB_INDUSTRY_NUM: 12
    },
    {
      INDUSTRY_ID: 4,
      INDUSTRY_NAME: 'Điện tử',
      LINK: '/hoasen/jobs?industry=4',
      JOB_INDUSTRY_NUM: 8
    }
  ],
  arrLocations: [
    {
      LOCATION_ID: 1,
      LOCATION_NAME: 'Hồ Chí Minh',
      LOCATION_CODE: 'HCM',
      LOCATION_LINK: '/hoasen/jobs?location=1',
      LOCATION_COUNT: 45
    },
    {
      LOCATION_ID: 2,
      LOCATION_NAME: 'Hà Nội',
      LOCATION_CODE: 'HN',
      LOCATION_LINK: '/hoasen/jobs?location=2',
      LOCATION_COUNT: 32
    },
    {
      LOCATION_ID: 3,
      LOCATION_NAME: 'Đà Nẵng',
      LOCATION_CODE: 'DN',
      LOCATION_LINK: '/hoasen/jobs?location=3',
      LOCATION_COUNT: 15
    },
    {
      LOCATION_ID: 4,
      LOCATION_NAME: 'Cần Thơ',
      LOCATION_CODE: 'CT',
      LOCATION_LINK: '/hoasen/jobs?location=4',
      LOCATION_COUNT: 8
    }
  ]
};
