import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa1/common/_header';
import Footer from '@/app/demoa1/common/_footer';
import IndexPage from '@/app/demoa1/index/index';
import { demoa1FooterData, demoa1HeaderData, demoa1IndexData } from '@/lib/sample-data';

export default async function Demoa1HomePage() {
  const siteId = 'demoa1';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa1HeaderData.arrRwInfo}
        arrEmployer={demoa1HeaderData.arrEmployer}
        controller="index"
        action="index"
        arrMenuCates={demoa1HeaderData.arrMenuCates}
        listFeatureCareer={demoa1HeaderData.listFeatureCareer}
        currentUrl="/demoa1"
        changeLangUrl="/demoa1?lang=en"
      />
      
      <IndexPage
        siteId={siteId}
        arrRwInfo={demoa1IndexData.arrRwInfo}
        arrIndustries={demoa1IndexData.arrIndustries}
        arrLocations={demoa1IndexData.arrLocations}
        language={siteConfig?.language || 'vi'}
      />
      
      <Footer 
        siteId={siteId} 
        footerMenuCates={demoa1FooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
