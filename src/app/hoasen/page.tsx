import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/hoasen/common/_header';
import Footer from '@/app/hoasen/common/_footer';
import IndexPage from '@/app/hoasen/index/index';
import { hoasenHeaderData, hoasenIndexData } from '@/lib/sample-data';

export default async function HoasenHomePage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="index"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen"
        CHANGE_LANG_URL="/hoasen?lang=en"
        language={siteConfig?.language || 'vi'}
      />
      
      <IndexPage
        siteId={siteId}
        arrRwInfo={hoasenIndexData.arrRwInfo}
        arrIndustries={hoasenIndexData.arrIndustries}
        arrLocations={hoasenIndexData.arrLocations}
        language={siteConfig?.language || 'vi'}
      />
      
      <Footer 
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
