import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa2/common/_header';
import Footer from '@/app/demoa2/common/_footer';
import IndexPage from '@/app/demoa2/index/index';
import { demoa2FooterData, demoa2HeaderData, demoa2IndexData } from '@/lib/sample-data';

export default async function Demoa2HomePage() {
  const siteId = 'demoa2';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={demoa2HeaderData.arrEmployer}
        controller="index"
        action="index"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl="/demoa2"
        changeLangUrl="/demoa2?lang=en"
      />
      
      <IndexPage
        siteId={siteId}
        arrRwInfo={{
          RW_BANNER: 'banner1.jpg;banner2.jpg;banner3.jpg'
        }}
        arrIndexNews={{
          NEWS_TITLE: 'Welcome to Demoa2 Job Portal',
          NEWS_CONTENT: '<p>Find your dream job with our comprehensive job search platform. We connect talented professionals with top companies worldwide.</p><p>Our platform offers advanced search features, career resources, and networking opportunities to help you succeed in your career journey.</p>'
        }}
        language={siteConfig?.language || 'en'}
      />
      
      <Footer 
        siteId={siteId} 
        footerMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
