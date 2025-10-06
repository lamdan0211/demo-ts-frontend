import { SiteConfig } from './types';

const sites: Record<string, SiteConfig> = {
  demoa1: {
    id: 'demoa1',
    name: 'Demo A1',
    language: 'vi',
    layoutType: 'default',
    theme: {
      primaryColor: '#ff5b00',
      secondaryColor: '#fff',
      backgroundColor: '#f8f9fa'
    },
    constants: {
      TN: '/demoa1',
      JSK: '/jobseekers',
      LANGUAGE: 'vi',
      LINK_RW_IMAGES: '/themes/demoa1/images',
      LINK_RESUME: '/resume',
      LINK_JOBS: '/jobs',
      LINK_JOBS_SEARCH: '/jobs/search',
      LINK_ALL_JOBS: '/jobs/all'
    }
  },
  demoa2: {
    id: 'demoa2',
    name: 'Demo A2',
    language: 'en',
    layoutType: 'default',
    theme: {
      primaryColor: '#007bff',
      secondaryColor: '#fff',
      backgroundColor: '#f8f9fa'
    },
    constants: {
      TN: '/demoa2',
      JSK: '/jobseekers',
      LANGUAGE: 'en',
      LINK_RW_IMAGES: '/themes/demoa2/images',
      LINK_RESUME: '/resume',
      LINK_JOBS: '/jobs',
      LINK_JOBS_SEARCH: '/jobs/search',
      LINK_ALL_JOBS: '/jobs/all'
    }
  },
  hoasen: {
    id: 'hoasen',
    name: 'Hoasen',
    language: 'vi',
    layoutType: 'premium',
    theme: {
      primaryColor: '#27ae60',
      secondaryColor: '#fff',
      backgroundColor: '#f8f9fa'
    },
    constants: {
      TN: '/hoasen',
      JSK: '/jobseekers',
      LANGUAGE: 'vi',
      LINK_RW_IMAGES: '/themes/hoasen/images',
      LINK_RESUME: '/resume',
      LINK_JOBS: '/jobs',
      LINK_JOBS_SEARCH: '/jobs/search',
      LINK_ALL_JOBS: '/jobs/all'
    }
  }
};

export function getSiteConfig(siteId: string): SiteConfig | null {
  return sites[siteId] || null;
}

export function getAllSites(): SiteConfig[] {
  return Object.values(sites);
}
