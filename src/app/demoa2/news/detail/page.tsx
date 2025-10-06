import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa2/common/_header';
import Footer from '@/app/demoa2/common/_footer';
import NewsDetail from '../detail';
import { demoa2FooterData, demoa2HeaderData } from '@/lib/sample-data';

export default async function Demoa2NewsDetailPage() {
  const siteId = 'demoa2';
  const siteConfig = getSiteConfig(siteId);

  // Sample news data
  const newsData = {
    CATE_PARENT_NAME: 'Career News',
    CATE_NAME: 'Job Market',
    CATE_TYPE: '1',
    NEWS_TITLE: 'Sample News Article',
    NEWS_CONTENT: '<p>This is a sample news article content.</p>',
  };

  const arrNews = [
    {
      LINK: '/demoa2/news/detail/1',
      NEWS_TITLE: 'Related News 1',
      NEWS_POSTDATE: '2024-01-15',
    },
    {
      LINK: '/demoa2/news/detail/2',
      NEWS_TITLE: 'Related News 2',
      NEWS_POSTDATE: '2024-01-14',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={{
          ...demoa2HeaderData.arrEmployer,
          RW_LOGO: 'logo.png'
        }}
        controller="news"
        action="detail"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl="/demoa2/news/detail"
        CHANGE_LANG_URL="/demoa2/news/detail?lang=vi"
        language={siteConfig?.language || 'en'}
      />
      
      <NewsDetail
        siteId={siteId}
        language={siteConfig?.language || 'en'}
        news={newsData}
        arrNews={arrNews}
        arrFunction={{ OFF_SHOW_POST_DATE_NEWS: false }}
        pages={{ pageCount: 3 }}
        t={(key: string) => key.replace('_', '').toLowerCase()}
      />
      
      <Footer 
        siteId={siteId} 
        arrFooterMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'en'}
      />
    </div>
  );
}
