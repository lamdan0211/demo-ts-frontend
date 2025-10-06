import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/hoasen/common/_header';
import Footer from '@/app/hoasen/common/_footer';
import NewsIndex from './index';
import { hoasenHeaderData, hoasenFooterData } from '@/lib/sample-data';

export default async function HoasenNewsPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="news"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen/news"
        CHANGE_LANG_URL="/hoasen?lang=en"
      />

      <NewsIndex
        siteId={siteId}
        language={siteConfig?.language || 'vi'}
        arrNews={[]}
        arrCateInfo={{
          CATE_ID: 1,
          CATE_NAME: 'Tin tức',
          LINK: '/hoasen/news'
        }}
        is_mobile={false}
      />

      <Footer
        siteId={siteId}
        arrFooterMenuCates={hoasenFooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
